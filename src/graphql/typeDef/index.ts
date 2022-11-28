import { gql } from "apollo-server-express";
import { commentsTypeDefs } from "./comments";
import { likesTypeDefs } from "./likes";
import { postsTypeDefs } from "./posts";
import { usersTypeDefs } from "./users";
import { chatsTypeDefs } from "./chats";
import { messagesTypeDefs } from "./messages";

const rootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }
`;

export const typeDefs = [
  rootTypeDefs,
  postsTypeDefs,
  usersTypeDefs,
  commentsTypeDefs,
  likesTypeDefs,
  chatsTypeDefs,
  messagesTypeDefs,
];
