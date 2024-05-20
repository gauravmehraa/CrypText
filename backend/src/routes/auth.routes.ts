import express, { NextFunction, Request, Response, Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller";
import protectRoute from "../middleware/protectRoute";

const router: Router = express.Router();

// HTTP POST - Signup
router.post("/signup", (req: Request, res: Response) => {
  signup(req, res);
});

// HTTP POST - Login
router.post("/login", (req: Request, res: Response) => {
  login(req, res);
});

// HTTP POST - Logout
router.post("/logout", protectRoute, (req: Request, res: Response) => {
  logout(req, res);
});

export default router;