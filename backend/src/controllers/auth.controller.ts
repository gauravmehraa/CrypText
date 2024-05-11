import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token";

export const signup = async (req: Request, res: Response) => {
  try{
    const { name, username, password, confirmPassword, gender } = req.body;

    if(password !== confirmPassword){
      return res.status(400).json({error: "Passwords do not match"});
    }

    const user: String | null = await User.findOne({ username });

    if(user){
      return res.status(400).json({error: "Username already exists"});
    }

    //password hashing using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ 
      name,
      username,
      password: hashedPassword,
      gender,
      profilePicture: `https://avatar.iran.liara.run/public/${gender === 'Male'? 'boy': 'girl'}?username=${username}`
    });
    if(newUser){
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        profilePicture: newUser.profilePicture,
      });
    }
    else{
      res.status(400).json({error: "Invalid User Data"});
    }

  }
  catch (error) {
    console.log("Error in signup controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}

export const login = async (req: Request, res: Response) => {
  try{
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user? user.password as string: "");

    if(!user || !validPassword){
      return res.status(400).json({error: "Invalid username or password"});
    }

    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      profilePicture: user.profilePicture,
    });
  }
  catch(error){
    console.log("Error in login controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}

export const logout = async (req: Request, res: Response) => {
  try{
    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({message: "Logged out successfully"});
  }
  catch(error){
    console.log("Error in logout controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}