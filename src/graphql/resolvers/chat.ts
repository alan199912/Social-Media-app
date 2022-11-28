import { Chat } from "../../models";
import checkAuth from "../../middleware/check-auth";

export const chatResolvers = {
  Query: {
    getChats: async (_: any, __: any, context: any) => {
      const userAuh = checkAuth(context);

      try {
        const chats = await Chat.find({
          users: { $in: [userAuh.id] },
        }).populate("users");

        return chats;
      } catch (error) {
        console.log(error);
        throw new Error(error as string);
      }
    },
  },
  Mutation: {
    createChat: async (_: any, { chatInput: { users } }: any, context: any) => {
      const userAuh = checkAuth(context);

      users.unshift(userAuh.id);

      try {
        const newChat = new Chat({
          users,
        });

        const chatSaved = await newChat.save();

        if (!chatSaved) {
          throw new Error("Error creating chat");
        }

        return "Chat created successfully";
      } catch (error) {
        console.log(error);
        throw new Error(error as string);
      }
    },
  },
};
