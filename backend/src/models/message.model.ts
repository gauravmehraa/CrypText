import { Schema, Types, model } from "mongoose";

export interface IMessage{
  _id: Types.ObjectId;
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  encryptedMessage: Buffer;
  iv: Buffer;
  isRead: Boolean;
  readAt: Date;
  isDeleted: Boolean;
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
  encryptedMessage: {
    type: Buffer,
    required : true,
  },
  iv: {
    type: Buffer,
    required : true,
  },
  isRead: {
    type: Boolean,
    required: true,
    default: false,
  },
  readAt: {
    type: Date,
    required: false,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  }
}, { timestamps: true });

const Message = model<IMessage>("Message", messageSchema);

export default Message;