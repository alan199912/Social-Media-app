import { postsResolvers } from "./posts";
import { usersResolvers } from "./users";
import { commentsResolvers } from "./comments";
import { likesResolvers } from "./likes";

export const resolvers = {
  Query: {
    ...postsResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...likesResolvers.Mutation,
  },
};
