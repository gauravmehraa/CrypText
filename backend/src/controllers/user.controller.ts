import { Request, Response } from "express";
import User from "../models/user.model";
import { Types } from "mongoose";

export const getUsers = async (req: Request, res: Response) => {
  try{
    const user: Types.ObjectId = req.user._id;
    const users = await User.find({
      _id: { $ne: user }
    }).select("-password -lastLogin -lastLogout -isLoggedIn");
    
    res.status(200).json(users);
  }
  catch (error) {
    console.log("Error in get users controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}