import { Request, Response } from "express";
import User from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
  try{
    const user = req.user._id;
    const users = await User.find({
      _id: { $ne: user }
    }).select("-password");

    res.status(200).json(users);
  }
  catch (error) {
    console.log("Error in get users controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}