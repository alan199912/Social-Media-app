import { gql } from "apollo-server-express";

export const likesTypeDefs = gql`
  # extend type Query {}

  extend type Mutation {
    likePost(postId: ID!): String!
    unLikePost(postId: ID!): String!
    likeComment(commentId: ID!): String!
    unLikeComment(commentId: ID!): String!
  }

  type Like {
    id: ID!
    user: User!
    post: Post!
    comment: Comment!
    createdAt: String!
    updatedAt: String!
  }
`;
