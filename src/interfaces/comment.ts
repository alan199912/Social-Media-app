import { LikeData } from "./like";
import { PostData } from "./post";
import { UserData } from "./user";

export interface CommentData {
  id: string;
  body: string;
  user: UserData;
  likes: LikeData[];
  post: PostData;
  createdAt: string;
  updatedAt: string;
}

export interface CommentInput {
  commentInput: {
    body: string;
    postId: string;
  };
}
