import { UserInputError } from "apollo-server";
import { loginInput, RegisterInput, UserData } from "../../interfaces/user";
import { User } from "../../models";
import { IUserSchema } from "../../models/User";

export const usersResolvers = {
  Query: {
    getUsers: async () => {
      try {
        return await User.find();
      } catch (error) {
        console.log(error);
        throw new Error("Error getting users");
      }
    },
  },
  Mutation: {
    register: async (
      _: UserData,
      {
        registerInput: { username, email, password, confirmPassword },
      }: RegisterInput
    ) => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          throw new UserInputError("User already exists", {
            errors: {
              email: "This email is already registered",
            },
          });
        }

        if (password !== confirmPassword) {
          throw new UserInputError("Passwords do not match", {
            errors: {
              confirmPassword: "Passwords do not match",
            },
          });
        }

        const newUser = new User({
          username,
          email,
          password,
        });

        await newUser.save();
        return "Created user successfully";
      } catch (error) {
        console.log(error);
        throw new UserInputError("Error registering user", {
          errors: {
            username: "Username is already taken",
          },
        });
      }
    },
    login: async (
      _: UserData,
      { loginInput: { email, password } }: loginInput
    ) => {
      try {
        const user: IUserSchema | null = await User.findOne({ email });
        if (!user) {
          throw new UserInputError("User does not exist");
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          throw new UserInputError("Invalid credentials");
        }

        const token = user.generateToken();

        return token;
      } catch (error) {
        console.log(error);
        throw new UserInputError(error as string);
      }
    },
  },
};
