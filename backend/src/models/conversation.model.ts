import { Document, Schema, Types, model } from "mongoose";
import { IMessage } from "./message.model";

interface IConversation extends Document{
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
}

const conversationSchema = new Schema<IConversation>({
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      }
    ],
}, { timestamps: true });

export const Conversation = model<IConversation>("Conversation", conversationSchema);