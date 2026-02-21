import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    loggedIn: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Admin = mongoose.model("Admin", adminSchema)
export default Admin;