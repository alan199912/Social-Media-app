import { gql } from "apollo-server";

export const usersTypeDefs = gql`
  extend type Query {
    getUsers: [User]
  }

  extend type Mutation {
    register(registerInput: RegisterInput): String!
    login(loginInput: loginInput): String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input loginInput {
    email: String!
    password: String!
  }

  type User {
    id: ID!
    name: String
    lastname: String
    username: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }
`;
