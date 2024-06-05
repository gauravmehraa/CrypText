import { Request, Response } from "express";
import { Conversation } from "../models/conversation.model";
import Message, { IMessage } from "../models/message.model";
import { Types } from "mongoose";
import { getReceiverSocketId, io } from "../sockets/socket";

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try{
    const { encryptedMessage, iv } = req.body;
    const { id: receiverId } = req.params;
    const senderId: Types.ObjectId = req.user._id as Types.ObjectId;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId]}
    });

    if(!conversation){
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: []
      })
    }

    const newMessage = new Message({
      senderId, receiverId, encryptedMessage, iv
    })

    if(newMessage){
      conversation.messages.push(newMessage._id as Types.ObjectId);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocket = getReceiverSocketId(receiverId);
    if(receiverSocket){
      io.to(receiverSocket).emit('newMessage', newMessage);
    }

    res.status(201).json(newMessage);

  }
  catch (error) {
    console.log("Error in send message controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}

export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try{
    const { id: receiverId } = req.params
    const senderId: Types.ObjectId = req.user._id as Types.ObjectId;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId]}
    }).populate({
      path: "messages",
      match: { isDeleted: false },
      select: "-isDeleted -__v -updatedAt"
    });

    
    if(!conversation){
      res.status(200).json([]);
      return;
    }

    const unreadMessages = conversation.messages.filter(message =>
      !(message as unknown as IMessage).isRead && (message as unknown as IMessage).senderId.toString() == receiverId
    );
    await Promise.all(unreadMessages.map(message => {
      return Message.updateOne(
        { _id: message._id, receiverId: { $eq: senderId } },
        { $set: { isRead: true, readAt: new Date() } }
      );
    }));
    const messages = conversation.messages;
    res.status(200).json(messages);
  }
  catch (error) {
    console.log("Error in get messages controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}

export const deleteMessages = async (req: Request, res: Response): Promise<void> => {
  try{
    const { id: receiverId } = req.params
    const senderId: Types.ObjectId = req.user._id as Types.ObjectId;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if(!conversation || conversation.messages.length === 0){
      res.status(500).json({error: "No messages to be deleted"});
      return;
    }

    await Message.updateMany(
      { _id: { $in: conversation.messages } },
      { $set: { isDeleted: true } }
    );

    await conversation.save();
    res.status(201).json({message: "Messages successfully deleted"});
  }
  catch (error) {
    console.log("Error in delete messages controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}