import { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const generateToken = (userId: Types.ObjectId, res: Response) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("No JWT_SECRET defined");
  }
  const token: string = jwt.sign( { userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // days * hours * minutes * seconds * milliseconds
    httpOnly: true, // XSS safe
    sameSite: "strict", // CSRF safe
    secure: process.env.NODE_ENV !== "dev"
  });
}

export default generateToken;