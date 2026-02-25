import express from "express";

const router = express.Router();

import { customerSignUp, adminSignUp, artisanSignUp, handleLogin, handleLogout } from "../controllers/auth.controller.js";
import { getMe } from "../controllers/me.controller.js";
import { upload } from "../utils/util.js";

router.post("/login", handleLogin)
router.post("/logout", handleLogout)

router.post("/customer-signup", customerSignUp)
router.post("/artisan-signup", upload.fields([{ name: 'passportImg', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), artisanSignUp)
router.post("/admin-signup", adminSignUp)

// Session hydration – returns the currently logged-in user (any role)
router.get("/me", getMe)


export default router;