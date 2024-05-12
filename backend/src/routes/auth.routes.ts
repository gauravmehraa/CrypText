import express, { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller";
import protectRoute from "../middleware/protectRoute";

const router: Router = express.Router();

// HTTP POST - Signup
router.post("/signup", signup);

// HTTP POST - Login
router.post("/login", login);

// HTTP POST - Logout
router.post("/logout", protectRoute, logout);

export default router;