import express, { Router } from "express";
import protectRoute from "../middleware/protectRoute";
import { signup, login, logout } from "../controllers/auth.controller";

const router: Router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", protectRoute, logout);

export default router;