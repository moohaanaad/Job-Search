import multer, { diskStorage } from "multer";
import { nanoid } from "nanoid";
import AppError from "./AppError.js";

export const fileValidation = {
    images: ['image/jpeg', 'image/png'],
    files: ['application/pdf', 'application/msword']
}

export const fileUpload = ({ folder, allowType }) => {
    const storage = diskStorage({
        destination: `uploads/${folder}`,
        filename: (req, file, cb) => {
            cb(null, nanoid() + "_" + file.originalname)
        }
    })
    const fileFilter = (req, file, cb) => {
        if (allowType.includes(file.mimetype)) {

            cb(null, true)
        }
        else{

            cb(new AppError('invaled file format', 400), false)
        }
    }
    const upload = multer({ storage, fileFilter })
    return upload
}