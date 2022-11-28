import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthenticationError } from "apollo-server-express";
import { UserData } from "../interfaces/user";
dotenv.config();

export default (context: any): UserData => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(
          token,
          process.env.SECRET_JWT as string
        ) as UserData;
        return user;
      } catch (error) {
        console.log(error);
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};
