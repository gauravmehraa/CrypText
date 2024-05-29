import { Schema, Types, model } from "mongoose";

export interface IMessage{
  _id: Types.ObjectId;
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  encryptedMessage: Buffer;
  iv: Buffer;
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
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  }
}, { timestamps: true });

const Message = model<IMessage>("Message", messageSchema);

export default Message;