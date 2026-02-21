import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const conDB = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URI)
        if (response) {
            console.log("MongoDB connected")
        }
    } catch (err) {
        console.log(err)
    }
}

export default conDB;