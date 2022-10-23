import checkAuth from "../../middleware/check-auth";
import { LikeData } from "../../interfaces/like";
import { Like, Post, Comment } from "../../models";

export const likesResolvers = {
  Mutation: {
    likePost: async (
      _: LikeData,
      { postId }: { postId: string },
      context: any
    ) => {
      const userAuh = checkAuth(context);
      try {
        const post = await Post.findById(postId);

        if (!post) {
          throw new Error("Post not found");
        }

        const like = await Like.findOne({
          user: userAuh.id,
          post: postId,
        });

        if (like) {
          throw new Error("Post already liked");
        }

        const newLike = new Like({
          user: userAuh.id,
          post: postId,
        });

        const likeSaved = await newLike.save();

        if (!likeSaved) {
          throw new Error("Error liking post");
        }

        post.likes.push(likeSaved.id);
        await post.save();

        return "Post liked successfully";
      } catch (error) {
        console.log(error);
        throw new Error(error as string);
      }
    },
    unLikePost: async (
      _: LikeData,
      { postId }: { postId: string },
      context: any
    ) => {
      const userAuh = checkAuth(context);
      try {
        const post = await Post.findById(postId);

        if (!post) {
          throw new Error("Post not found");
        }

        const like = await Like.findOne({
          user: userAuh.id,
          post: postId,
        });

        if (!like) {
          throw new Error("Post not liked");
        }

        const likeDeleted = await like.delete();

        if (!likeDeleted) {
          throw new Error("Error unliking post");
        }

        const postLikes = post.likes.filter(
          (likeId) => likeId.toString() !== like.id
        );
        post.likes = postLikes;
        await post.save();

        return "Post unliked successfully";
      } catch (error) {
        console.log(error);
        throw new Error(error as string);
      }
    },
    likeComment: async (
      _: LikeData,
      { commentId }: { commentId: string },
      context: any
    ) => {
      const userAuh = checkAuth(context);
      try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
          throw new Error("Comment not found");
        }

        const like = await Like.findOne({
          user: userAuh.id,
          comment: commentId,
        });

        if (like) {
          throw new Error("Comment already liked");
        }

        const newLike = new Like({
          user: userAuh.id,
          comment: commentId,
        });

        const likeSaved = await newLike.save();

        if (!likeSaved) {
          throw new Error("Error liking comment");
        }

        comment.likes.push(likeSaved.id);
        await comment.save();

        return "Comment liked successfully";
      } catch (error) {
        console.log(error);
        throw new Error(error as string);
      }
    },
    unLikeComment: async (
      _: LikeData,
      { commentId }: { commentId: string },
      context: any
    ) => {
      const userAuh = checkAuth(context);
      try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
          throw new Error("Comment not found");
        }

        const like = await Like.findOne({
          user: userAuh.id,
          comment: commentId,
        });

        if (!like) {
          throw new Error("Comment not liked");
        }

        const likeDeleted = await like.delete();

        if (!likeDeleted) {
          throw new Error("Error unliking comment");
        }

        const commentLikes = comment.likes.filter(
          (likeId) => likeId.toString() !== like.id
        );
        comment.likes = commentLikes;
        await comment.save();

        return "Comment unliked successfully";
      } catch (error) {
        console.log(error);
        throw new Error(error as string);
      }
    },
  },
};
