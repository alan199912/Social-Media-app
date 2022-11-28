import { postsResolvers } from "./posts";
import { usersResolvers } from "./users";
import { commentsResolvers } from "./comments";
import { likesResolvers } from "./likes";
import { chatResolvers } from "./chat";
import { messageResolvers } from "./messages";

export const resolvers = {
  Query: {
    ...postsResolvers.Query,
    ...usersResolvers.Query,
    ...chatResolvers.Query,
    ...messageResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...likesResolvers.Mutation,
    ...chatResolvers.Mutation,
    ...messageResolvers.Mutation,
  },
  Subscription: {
    ...messageResolvers.Subscription,
  },
};
