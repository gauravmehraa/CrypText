import express, { Router, Request, Response } from "express";
import { signup, login, logout } from "../controllers/auth.controller";

const router: Router = express.Router();

router.get("/signup", signup);

router.get("/login", login);

router.get("/logout", logout);

export default router;