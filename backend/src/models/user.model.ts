import { Schema, model } from "mongoose";

export interface IUser{
  name: string;
  username: string;
  password: string;
  gender: string;
  profilePicture?: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"]
  },
  profilePicture: {
    type: String,
    default: "",
  }
}, { timestamps: true });

const User = model<IUser>("User", userSchema);

export default User;