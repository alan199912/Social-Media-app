import { PostData, PostInput } from "../../interfaces/post";
import { Post } from "../../models";
import checkAuth from "../../middleware/check-auth";

export const postsResolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find()
          .sort({ createdAt: -1 })
          .populate("user")
          .populate({
            path: "comments",
            populate: {
              path: "likes",
              model: "Like",
            },
          })
          .populate("likes");

        console.log({ posts });
        return posts;
      } catch (error) {
        console.log(error);
        throw new Error("Error getting posts");
      }
    },
    getPost: async (_: PostData, { postId }: { postId: string }) => {
      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error("Post not found");
        }

        return post;
      } catch (error) {
        console.log(error);
        throw new Error(error as string);
      }
    },
  },
  Mutation: {
    createPost: async (
      _: PostData,
      { postInput: { title, content } }: PostInput,
      context: any
    ) => {
      const userAuh = checkAuth(context);
      try {
        const newPost = new Post({
          title,
          content,
          user: userAuh.id,
        });

        const postSaved = await newPost.save();

        if (!postSaved) {
          throw new Error("Error creating post");
        }

        return "Post created successfully";
      } catch (error) {
        console.log(error);
        throw new Error(error as string);
      }
    },
    deletePost: async (
      _: PostData,
      { postId }: { postId: string },
      context: any
    ) => {
      const userAuh = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error("Post not found");
        }

        if (userAuh?.id === post?.user!.toString()) {
          await post.delete();
          return "Post deleted successfully";
        }

        return "You are not authorized to delete this post";
      } catch (error) {
        console.log(error);
        throw new Error(error as string);
      }
    },
  },
};
