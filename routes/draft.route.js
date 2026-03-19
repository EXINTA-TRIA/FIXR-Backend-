import express from "express";
import { saveDraft, getDraft, deleteDraft } from "../controllers/draft.controller.js";
import { verifyAccessByLogin } from "../middlewares/verification.js";

const router = express.Router();

router.post("/", verifyAccessByLogin, saveDraft);
router.get("/", verifyAccessByLogin, getDraft);
router.delete("/", verifyAccessByLogin, deleteDraft);

export default router;
