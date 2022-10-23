import { gql } from "apollo-server";
import { commentsTypeDefs } from "./comments";
import { likesTypeDefs } from "./likes";
import { postsTypeDefs } from "./posts";
import { usersTypeDefs } from "./users";

const rootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

export const typeDefs = [
  rootTypeDefs,
  postsTypeDefs,
  usersTypeDefs,
  commentsTypeDefs,
  likesTypeDefs,
];
