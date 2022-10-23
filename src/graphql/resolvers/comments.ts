import { Comment, Post } from "../../models";
import checkAuth from "../../middleware/check-auth";
import { CommentData, CommentInput } from "../../interfaces/comment";

export const commentsResolvers = {
  Mutation: {
    createComment: async (
      _: CommentData,
      { commentInput: { body, postId } }: CommentInput,
      context: any
    ) => {
      const userAuh = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        console.log({ post });

        if (!post) {
          throw new Error("Post not found");
        }

        const newComment = new Comment({
          body,
          user: userAuh.id,
          post: postId,
        });

        const commentSaved = await newComment.save();

        if (!commentSaved) {
          throw new Error("Error creating comment");
        }

        post.comments.push(commentSaved.id);
        await post.save();

        return "Comment created successfully";
      } catch (error) {
        console.log(error);
        throw new Error(error as string);
      }
    },
    deleteComment: async (
      _: CommentData,
      { commentId }: { commentId: string },
      context: any
    ) => {
      const userAuh = checkAuth(context);
      try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
          throw new Error("Comment not found");
        }

        if (userAuh?.id !== comment?.user?.toString()) {
          throw new Error("Unauthorized");
        }

        const commentDeleted = await comment.delete();

        if (!commentDeleted) {
          throw new Error("Error deleting comment");
        }

        // Delete comment from post
        const post = await Post.findById(comment.post);
        console.log({ post });
        if (!post) {
          throw new Error("Post not found");
        }

        post.comments = post.comments.filter(
          (comment) => comment.toString() !== commentId
        );
        await post.save();

        return "Comment deleted successfully";
      } catch (error) {
        console.log(error);
        throw new Error(error as string);
      }
    },
  },
};
