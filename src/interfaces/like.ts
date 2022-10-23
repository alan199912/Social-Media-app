import { CommentData } from "./comment";
import { PostData } from "./post";
import { UserData } from "./user";

export interface LikeData {
  id: string;
  user: UserData;
  post: PostData;
  comment: CommentData;
  createdAt: string;
  updatedAt: string;
}
