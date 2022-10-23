import { CommentData } from "./comment";
import { LikeData } from "./like";
import { UserData } from "./user";

export interface PostData {
  title: string;
  content: string;
  comments: CommentData[];
  likes: LikeData[];
  user: UserData;
}

export interface PostInput {
  postInput: { title: string; content: string };
}
