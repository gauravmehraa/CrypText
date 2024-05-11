import { Response } from "express";
import jwt from "jsonwebtoken";

const generateToken = (userId: unknown, res: Response) => {
  const token: string = jwt.sign( { userId }, process.env.JWT_SECRET!, {
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