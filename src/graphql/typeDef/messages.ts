import { gql } from "apollo-server-express";

export const messagesTypeDefs = gql`
  extend type Query {
    getMessages(chatId: ID!): [Message]
  }

  extend type Mutation {
    createMessage(messageInput: MessageInput): Message
  }

  extend type Subscription {
    newMessage(chatId: ID!): Message
  }

  input MessageInput {
    chatId: ID!
    content: String!
  }

  type Message {
    id: ID!
    user: User!
    chat: Chat!
    content: String!
    createdAt: String!
    updatedAt: String!
  }
`;
