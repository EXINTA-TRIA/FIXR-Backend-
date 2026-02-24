import express from "express";

import Customer from "../models/customer.model.js";
import Artisan from "../models/artisan.model.js";

import { verifyAccessByModel } from "../middlewares/verification.js";
import { cancelCustomerPayment, getArtisanPaymentHistory, getCustomerPaymentHistory, initiatePayment, verifyCustomerPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/pay/:orderId", verifyAccessByModel(Customer), initiatePayment)
router.post("/payment-verification", verifyAccessByModel(Customer), verifyCustomerPayment)
router.get("/payment-cancel/:tx_ref", cancelCustomerPayment)
router.get("/payment-history/customer", verifyAccessByModel(Customer), getCustomerPaymentHistory)
router.get("/payment-history/artisan", verifyAccessByModel(Artisan), getArtisanPaymentHistory)

export default router;