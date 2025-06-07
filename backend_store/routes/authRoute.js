import express from "express";
import { register, login, logout, becomeSeller } from "../controllers/authController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.put("/becomeseller", verifyToken, becomeSeller);


export default router;