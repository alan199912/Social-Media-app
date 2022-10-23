import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUserSchema extends Document {
  name: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
  generateToken(): string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Must match an email address!",
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// hash password before saving to database
userSchema.pre("save", async function (next): Promise<void> {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// compare password
userSchema.methods.comparePassword = function (
  candidatePassword: string
): boolean {
  const user = this as IUserSchema;
  return bcrypt.compareSync(candidatePassword, user.password);
};

// generate token
userSchema.methods.generateToken = function (): string {
  const user = this as IUserSchema;
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_JWT as string,
    { expiresIn: "24h", algorithm: "HS256" }
  );
  return token;
};

export const User = model<IUserSchema>("User", userSchema);
