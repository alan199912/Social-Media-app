import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connect = async () => {
  const uri = process.env.MONGO_URI;
  await mongoose
    .connect(uri!)
    .then(() => console.log("[DB] connected"))
    .catch((err) => console.log(err));
};
