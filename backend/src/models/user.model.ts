import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new mongoose.Schema({
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
});

const User = mongoose.model("User", userSchema);

export default User;