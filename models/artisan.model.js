import mongoose from "mongoose";

const artisanSchema = new mongoose.Schema({
    auth: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },
     role: {
        type:String,
        enum: ["customer", "artisan", "admin"],
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    serviceRendered: {
        type: String,
        enum: ["mechanic", "plumber", "welder", "carpenter", "tailor", "shoe-maker", "technician", "electrician"],
        required: true
    },
    serviceDescription: {
        type: String, //e.g deals with all kind of phone repairs
        required: true
    },
    passportImg: {
        type: String,
        required: true
    },
    cv: {
        type: String,
        required: true
    },
    applicationStatus: {
        type: String,
        enum: ["pending", "approved"],
        default: "pending"
    },
    reviews: [{
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer"
        },
        comment: String,
        rating: {
            type: Number,
            max: 5
        }
    }],
    loggedIn: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Artisan = mongoose.model("Artisan", artisanSchema)
export default Artisan;

//you must leave a rating if you would be leaving a rating (star) but you can rate without review 