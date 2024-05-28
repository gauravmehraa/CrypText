import { Date, Schema, Types, model } from "mongoose";

export interface IUser{
  _id: Types.ObjectId;
  name: string;
  username: string;
  password: string;
  gender: string;
  profilePicture?: string;
  publicKey: Buffer;
  encryptedPrivateKey: Buffer;
  iv: Buffer;
  salt: Buffer;
  lastLogin?: Date;
  lastLogout?: Date;
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
  },
  publicKey: {
    type: Buffer,
    required: true,
  },
  encryptedPrivateKey: {
    type: Buffer,
    required: true,
  },
  iv: {
    type: Buffer,
    required: true,
  },
  salt: {
    type: Buffer,
    required: true,
  },
  lastLogin: {
    type: Date,
    required: false,
  },
  lastLogout: {
    type: Date,
    required: false,
  }
}, { timestamps: true });

const User = model<IUser>("User", userSchema);

export default User;