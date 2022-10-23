import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Comment = model("Comment", commentSchema);
