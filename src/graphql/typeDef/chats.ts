import { gql } from "apollo-server-express";

export const chatsTypeDefs = gql`
  extend type Query {
    getChats: [Chat]
  }

  extend type Mutation {
    createChat(chatInput: ChatInput): String!
  }

  input ChatInput {
    users: [ID]!
  }

  type Chat {
    id: ID!
    users: [User]!
    createdAt: String!
    updatedAt: String!
  }
`;
