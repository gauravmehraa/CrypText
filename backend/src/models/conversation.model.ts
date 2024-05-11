import { Schema, Types, model } from "mongoose";

interface IConversation{
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
}

const conversationSchema = new Schema<IConversation>({
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
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