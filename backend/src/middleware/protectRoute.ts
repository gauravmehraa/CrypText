import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/user.model";

const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const token: string | undefined = req.cookies.jwt;
    if(!token){
      res.status(401).json({error: "Unauthorized - No token provided"});
      return;
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if(!decoded){
      res.status(401).json({error: "Unauthorized - Invalid token"});
      return;
    }

    const user: IUser | null = await User.findById((decoded as JwtPayload).userId).select("-password");
    if(!user){
      res.status(404).json({error: "User not found"});
      return;
    }

    req.user = user;

    next();
  }
  catch (error){
    console.log("Error in protect route middleware", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}

export default protectRoute;