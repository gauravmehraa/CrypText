import express, { Router } from "express";
import protectRoute from "../middleware/protectRoute";
import { getUsers } from "../controllers/user.controller";

const router: Router = express.Router();

router.get("/", protectRoute, getUsers);

export default router;