import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    artisanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artisan",
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    tx_ref: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'NGN'
    },
    payment_link: String,
    payment_response: Object,
    status: {
        type: String,
        enum: ["successful", "failed", "pending", "cancelled", "error"],
        default: "pending"
    },
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;