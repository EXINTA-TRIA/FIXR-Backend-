import Admin from "../models/admin.model.js";

export const getAllAdmin = async (req, res) => {
    try {
        const allAdmins = await Admin.find().populate("auth", "email -_id");
        return res.status(200).json(allAdmins)
    } catch (error) {
        console.log("Error in getAllAdmin function in admin.controller.js", error.message)
        res.status(500).json({message: "Error fetching all admins"})
    }
}

export const getAdminById = async (req, res) => {
    const adminId = req.user?.id

    if (!adminId) {
        return res.status(400).json({ message: "Invalid access" });
    }

    try {
        const admin = await Admin.findById(adminId).populate("auth", "email")
        if (!admin) {
            return res.status(400).json({ message: "Admin Not Found!" });
        }
        return res.status(200).json(admin)
    } catch (error) {
        console.log("Error in getAdminById function in admin.controller.js", error.message)
        res.status(500).json({message: "Error fetching admin data"})
    }
}