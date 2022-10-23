import { gql } from "apollo-server";

export const postsTypeDefs = gql`
  extend type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  extend type Mutation {
    createPost(postInput: PostInput): String!
    deletePost(postId: ID!): String!
  }

  input PostInput {
    title: String!
    content: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    comments: [Comment]!
    likes: [Like]!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`;
