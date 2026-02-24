import { hashPassword } from "../utils/util.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Auth from "../models/auth.model.js";
import Customer from "../models/customer.model.js";
import Artisan from "../models/artisan.model.js";
import Admin from "../models/admin.model.js";

const env = process.env.NODE_ENV || "development";
const isProduction = env === "production";

export const customerSignUp = async (req, res) => {
    const { firstName, lastName, phoneNumber, email, password } = req.body;

    if (!firstName || !lastName || !phoneNumber || !email || !password) {
        return res.status(400).json({ message: "Fill all fields" })
    }

    const existingAccount = await Auth.findOne({ email })
    if (existingAccount) {
        return res.status(409).json({ message: "Account exists" })
    }

    try {
        const hashedPassword = hashPassword(password);

        const newCustomer = new Customer({
            firstName, lastName, phoneNumber, role: "customer"
        })
        await newCustomer.save()

        const customerID = newCustomer._id
        const auth = Auth({
            email,
            password: hashedPassword,
            userId: customerID,
            userModel: "Customer"
        })
        await auth.save()

        //link auth details to corresponding user
        newCustomer.auth = auth._id;
        await newCustomer.save();

        return res.status(201).json("Account created!", newCustomer)
    } catch (err) {
        console.log("Error in customerSignUp function in auth.controller.js")
        return res.status(500).json({ message: "Error in signing up customer" } || "Server error")
    }
}

export const artisanSignUp = async (req, res) => {
    //console.log(req.files)

    const { firstName, lastName, phoneNumber, email, password, city, state, serviceRendered, serviceDescription } = req.body;

    if (!firstName || !lastName || !phoneNumber || !email || !password || !city || !state || !serviceRendered || !serviceDescription) {
        return res.status(400).json({ message: "Fill all fields" })
    }

    const existingAccount = await Auth.findOne({ email })
    if (existingAccount) {
        return res.status(409).json({ message: "Account exists" })
    }

    try {
        const hashedPassword = hashPassword(password);

        const newArtisan = new Artisan({
            firstName,
            lastName,
            phoneNumber,
            city,
            state,
            serviceRendered,
            serviceDescription,
            passportImg: req.files.passportImg?.[0].filename,
            cv: req.files.cv?.[0].filename,
            role: "artisan"
        })
        await newArtisan.save()

        const artisanID = newArtisan._id
        const auth = Auth({
            email,
            password: hashedPassword,
            userId: artisanID,
            userModel: "Artisan"
        })
        await auth.save()

        //link auth details to corresponding user
        newArtisan.auth = auth._id;
        await newArtisan.save();

        return res.status(201).json("Account created!", newArtisan)
    } catch (err) {
        console.log("Error in artisanSignUp function in auth.controller.js", err.message)
        return res.status(500).json({ message: "Error in signing up artisan" } || "Server error")
    }
}

export const adminSignUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "Fill all fields" })
    }

    const existingAccount = await Auth.findOne({ email })
    if (existingAccount) {
        return res.status(409).json({ message: "Account exists" })
    }

    try {
        const hashedPassword = hashPassword(password);

        const newAdmin = new Admin({
            firstName, lastName, userModel: "Admin", role: "admin"
        })
        await newAdmin.save()

        const adminID = newAdmin._id
        const auth = Auth({
            email,
            password: hashedPassword,
            userId: adminID,
            userModel: "Admin"
        })
        await auth.save()

        //link auth details to corresponding user
        newAdmin.auth = auth._id;
        await newAdmin.save();

        return res.status(201).json("Account created!", newAdmin)
    } catch (err) {
        console.log("Error in adminSignUp function in auth.controller.js", err.message)
        return res.status(500).json({ message: "Error signing up admin" } || "Server error")
    }
}

export const handleLogin = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Fill in all fields"
        });
    }

    const existingAccount = await Auth.findOne({ email })
    console.log(existingAccount)

    if (!existingAccount) {
        return res.status(400).json({ message: "Incorrect login details" })
    }

    const passwordValid = await bcrypt.compare(password, existingAccount.password);

    if (!passwordValid) {
        return res.status(400).json({ message: "Incorrect login details" })
    }

    try {
        const token = jwt.sign({
            id: existingAccount.userId, email: existingAccount.email
        }, process.env.JWT_SECRET);


        res.cookie("stored_token", token, {
            path: "/",
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        })

        // const accountDetails = await Model.findById(existingAccount.userId);
        // accountDetails.loggedIn = true;
        // await accountDetails.save();

        const role = (existingAccount.userModel).toLowerCase()
       
        return res.status(200).json({ message: "Login successful", role });
    } catch (err) {
        console.log("Error in login function in auth.controller.js", )
        return res.status(500).json({ message: "Error logging in user" })
    }
}

export const handleLogOut = async (req, res) => {
    try {
        // const accountDetails = await Model.findById(accountId)
        // accountDetails.loggedIn = false;
        // await accountDetails.save();

        res.setHeader("Cache-Control", "no-store");
        res.setHeader("Pragma", "no-cache");
        res.clearCookie("stored_token", {
            path: "/",
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        })
        return res.status(200).json({ message: "Logged out" });
    } catch (err) {
        console.log("Error in logout function in auth.controller.js")
        return res.status(500).json({ message: "Error logging out user" } || "Server error")
    }
}


