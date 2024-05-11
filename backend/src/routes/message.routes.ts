import express, { Router } from "express";
import protectRoute from "../middleware/protectRoute";
import { sendMessage, getMessages } from "../controllers/message.controller";

const router: Router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;