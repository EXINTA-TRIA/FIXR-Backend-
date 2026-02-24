import express from "express";

import Admin from "../models/admin.model.js";
import { verifyAccessByModel } from "../middlewares/verification.js";
import { getAdminById, getAllAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/", verifyAccessByModel(Admin), getAllAdmin)
router.get("/adminId", verifyAccessByModel(Admin), getAdminById)

export default router;
