import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";

export const hashPassword = (password) => {
    const hashedPassword = bcrypt.hashSync(password, 10)
    return hashedPassword;
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

export const upload = multer({
    limits: { fileSize: 2 * 1024 * 1024 },
    storage: storage
})
