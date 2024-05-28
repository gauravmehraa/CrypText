import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token";

interface SignupRequest extends Request{
  body: {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: string;
    publicKey: Buffer;
    encryptedPrivateKey: Buffer;
    iv: Buffer;
    salt: Buffer;
  };
}

interface LoginRequest extends Request{
  body: {
    username: string;
    password: string;
  };
}

export const signup = async (req: SignupRequest, res: Response): Promise<void> => {
  try{
    const { name, username, password, confirmPassword, gender, publicKey, encryptedPrivateKey, iv, salt } = req.body;

    if(password !== confirmPassword){
      res.status(400).json({error: "Passwords do not match"});
      return;
    }
    
    const user: IUser | null = await User.findOne({ username });
    
    if(user){
      res.status(400).json({error: "Username already exists"});
      return;
    }
    
    //password hashing using bcrypt
    const passwordSalt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, passwordSalt);

    const newUser = new User({ 
      name,
      username,
      password: hashedPassword,
      publicKey,
      encryptedPrivateKey,
      iv,
      salt,
      gender,
      lastLogin: new Date(),
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

export const login = async (req: LoginRequest, res: Response): Promise<void> => {
  try{
    const { username, password } = req.body;
    const user: IUser | null = await User.findOne({ username });

    if (!user || !user.password) {
      res.status(400).json({ error: "Invalid username or password" });
      return;
    }

    const validPassword: boolean = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(400).json({ error: "Invalid username or password" });
      return;
    }

    await User.findOneAndUpdate(
      { username },
      { isLoggedIn: true, lastLogin: new Date() }
    )

    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      profilePicture: user.profilePicture,
      encryptedPrivateKey: user.encryptedPrivateKey,
      iv: user.iv,
      salt: user.salt,
    });
  }
  catch(error){
    console.log("Error in login controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
  try{
    const username: string = req.user.username;
    await User.findOneAndUpdate(
      { username },
      { lastLogout: new Date() }
    )
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: `Logged out successfully from ${username}`});
  }
  catch(error){
    console.log("Error in logout controller", (error as Error).message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}