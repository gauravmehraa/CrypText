import { Request, Response } from "express";
import { Conversation } from "../models/conversation.model";
import Message from "../models/message.model";
import { Types } from "mongoose";

export const sendMessage = async (req: Request, res: Response) => {
  try{
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId: Types.ObjectId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId]}
    });

    if(!conversation){
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      })
    }

    const newMessage = new Message({
      senderId, receiverId, message
    })

    if(newMessage){
      conversation.messages.push(newMessage._id);
    }

    // implement sockets here

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);

  }
  catch (error) {
    console.log("Error in send message controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}

export const getMessages = async (req: Request, res: Response) => {
  try{
    const { id: receiverId } = req.params
    const senderId: Types.ObjectId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId]}
    }).populate("messages");
    
    if(!conversation) return res.status(200).json([]);

    const messages = conversation?.messages;
    res.status(200).json(messages);
  }
  catch (error) {
    console.log("Error in get messages controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}