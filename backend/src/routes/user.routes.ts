import express, { Router } from "express";
import { getUsers } from "../controllers/user.controller";
import protectRoute from "../middleware/protectRoute";

const router: Router = express.Router();

router.get("/", protectRoute, getUsers);

export default router;