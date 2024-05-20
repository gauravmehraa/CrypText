import express, { Router } from "express";
import protectRoute from "../middleware/protectRoute";
import { sendMessage, getMessages, deleteMessages } from "../controllers/message.controller";

const router: Router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.delete("/clear/:id", protectRoute, deleteMessages);

export default router;