import express from "express";

import Customer from "../models/customer.model.js";
import Artisan from "../models/artisan.model.js";

import { verifyAccessByModel } from "../middlewares/verification.js";
import { createOrderByCustomer, getOrderByCustomerId, getOrderByArtisanId, updateOrderReview, updateOrderRepairStatus, updateOrderRepairFee, updateOrderRepairReport } from "../controllers/order.controller.js";
import { upload } from "../utils/util.js";

const router = express.Router();

router.post("/", verifyAccessByModel(Customer), createOrderByCustomer)
router.get("/customer", verifyAccessByModel(Customer), getOrderByCustomerId)
router.get("/artisan", verifyAccessByModel(Artisan), getOrderByArtisanId)
router.patch("/:orderId/review", verifyAccessByModel(Customer), updateOrderReview)
router.patch("/:orderId/repair-status", verifyAccessByModel(Artisan), updateOrderRepairStatus)
router.patch("/:orderId/repair-fee", verifyAccessByModel(Artisan), updateOrderRepairFee)
router.patch("/:orderId/report", upload.fields([{ name: 'preImg', maxCount: 1 }, { name: "postImg", maxCount: 1 }]), verifyAccessByModel(Artisan), updateOrderRepairReport)

export default router;