import { Chat, Message } from "../../models";
import checkAuth from "../../middleware/check-auth";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
const SUBSCRIPTION_EVENTS = {
  NEW_MESSAGE: "NEW_MESSAGE",
};

export const messageResolvers = {
  Query: {
    getMessages: async (_: any, { chatId }: any, context: any) => {
      const userAuh = checkAuth(context);
      try {
        const chat = await Chat.findById(chatId);

        console.log(chat);

        if (!chat) {
          throw new Error("Chat not found");
        }

        // if (!chat.users.includes(userAuh.id)) {
        //   throw new Error("Unauthorized");
        // }

        const messages = await Message.find({ chat: chatId }).populate("user");

        console.log(messages);

        return messages;
      } catch (error) {
        console.log(error);
        throw new Error(error as string);
      }
    },
  },
  Mutation: {
    createMessage: async (
      _: any,
      { messageInput: { chatId, content } }: any,
      context: any
    ) => {
      const userAuh = checkAuth(context);

      try {
        const chat = await Chat.findById(chatId);

        if (!chat) {
          throw new Error("Chat not found");
        }

        const newMessage = new Message({
          user: userAuh.id,
          content,
          chat: chatId,
        });

        const messagedSaved = await newMessage.save();

        if (!messagedSaved) {
          throw new Error("Error creating message");
        }

        console.log("messagedSaved", messagedSaved);

        pubsub.publish(SUBSCRIPTION_EVENTS.NEW_MESSAGE, {
          newMessage: messagedSaved.populate("user"),
        });

        return messagedSaved;
      } catch (error) {
        console.log(error);
        throw new Error(error as string);
      }
    },
  },
  Subscription: {
    newMessage: {
      subscribe: async (_: any, { chatId }: any) => {
        console.log(chatId);

        try {
          const chat = await Chat.find({
            _id: chatId,
          });

          console.log(chat);

          if (!chat) {
            throw new Error("Chat not found");
          }

          return pubsub.asyncIterator(SUBSCRIPTION_EVENTS.NEW_MESSAGE);
        } catch (error) {
          console.log(error);
          throw new Error(error as string);
        }
      },
    },
  },
};
