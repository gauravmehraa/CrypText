import express, { Router, Request, Response } from "express";
import { signup, login, logout } from "../controllers/auth.controller";

const router: Router = express.Router();

// HTTP POST - Signup
router.post("/signup", signup);

// HTTP POST - Login
router.post("/login", login);

// HTTP POST - Logout
router.post("/logout", logout);

export default router;