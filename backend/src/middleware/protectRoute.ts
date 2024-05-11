import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const token = req.cookies.jwt;
    if(!token){
      return res.status(401).json({error: "Unauthorized - No token provided"});
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if(!decoded){
      return res.status(401).json({error: "Unauthorized - Invalid token"});
    }

    const user = await User.findById((decoded as JwtPayload).userId).select("-password");
    if(!user){
      return res.status(404).json({error: "User not found"});
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