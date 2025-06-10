import express from "express";
import {
  addMessage,
  getMessages,
  markAsRead,
} from "../controllers/messageController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, addMessage);
router.get("/:conversationId", verifyToken, getMessages);
router.put("/read/:messageId", verifyToken, markAsRead);

export default router;