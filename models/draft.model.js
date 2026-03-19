import mongoose from "mongoose";

const draftSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, { timestamps: true });

const Draft = mongoose.model("Draft", draftSchema);
export default Draft;
