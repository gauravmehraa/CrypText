import { Request, Response } from "express";

export const signup = async (req: Request, res: Response) => {
  try{
    const { fullName, username, password, confirmPassword, gender }= req.body;
  }
  catch (error) {
    console.log("Error");
  }
}

export const login = (req: Request, res: Response) => {
  res.send("loginUser");
}

export const logout = (req: Request, res: Response) => {
  res.send("logoutUser");
}