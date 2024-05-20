import { Schema, Types, model } from "mongoose";

export interface IMessage{
  _id: Types.ObjectId;
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  message: string;
}

const messageSchema = new Schema<IMessage>({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required : true,
  }
}, { timestamps: true });

const Message = model<IMessage>("Message", messageSchema);

export default Message;