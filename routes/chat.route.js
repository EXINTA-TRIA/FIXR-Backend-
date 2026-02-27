import express from "express";
import { getMessagesByOrder, sendMessage } from "../controllers/chat.controller.js";
import { verifyAccessByLogin } from "../middlewares/verification.js";

const router = express.Router();

router.get("/:orderId", verifyAccessByLogin, getMessagesByOrder);
router.post("/:orderId", verifyAccessByLogin, sendMessage);

export default router;
