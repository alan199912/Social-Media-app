import { gql } from "apollo-server";

export const commentsTypeDefs = gql`
  # extend type Query {}

  extend type Mutation {
    createComment(commentInput: CommentInput): String!
    deleteComment(commentId: ID!): String!
  }

  input CommentInput {
    body: String!
    postId: ID!
  }

  type Comment {
    id: ID!
    body: String!
    user: User!
    likes: [Like]!
    createdAt: String!
    updatedAt: String!
  }
`;
