import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try{
    const user: IUser | undefined = req.user as IUser;
    if(!user){
      res.status(404).json({ error: "User not found" });
      return;
    }

    const users: IUser[] = await User.find({
      _id: { $ne: user }
    }).select("-password -encryptedPrivateKey -iv -salt -lastLogin -lastLogout -updatedAt -createdAt -__v");
    
    res.status(200).json(users);
  }
  catch (error) {
    console.log("Error in get users controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}