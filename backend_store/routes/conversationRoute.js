import express from "express";
import {
  newConversation,
  getConversations,
  newGroupConversation,
} from "../controllers/conversationController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, newConversation);
router.post("/group", verifyToken, newGroupConversation);
router.get("/:userId", verifyToken, getConversations);

export default router;