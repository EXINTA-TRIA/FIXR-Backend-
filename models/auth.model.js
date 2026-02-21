import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "userModel"
    },
    userModel: {
        type: String,
        required: true,
        enum: ["Customer", "Artisan", "Admin"]
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
}, { timestamps: true }
)

const Auth = mongoose.model("Auth", authSchema)
export default Auth;