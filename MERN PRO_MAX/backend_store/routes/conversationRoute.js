// import express from "express";
// import { createConversation, createOrGetConversation, getConversations,getSingleConversation,updateConversation } from "../controllers/conversationController.js";
// import { verifyToken } from "../middleware/jwt.js";

// const router = express.Router();

// router.get("/", verifyToken, getConversations);
// router.post("/", verifyToken, createConversation);
// router.get("/single/:id", verifyToken, getSingleConversation);
// router.put("/:id", verifyToken, updateConversation);
// router.post("/", createOrGetConversation);

// export default router;
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