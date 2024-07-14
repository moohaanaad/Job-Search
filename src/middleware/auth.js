import jwt from "jsonwebtoken"
import AppError from "../utils/AppError.js"

const auth = (req, res, next) => {
    const token = req.headers.authorization.split("honda__")[1]
    const payload = jwt.verify(token, "lolSystem")
    if(!payload){
        next(new AppError("please login", 404))
    }
    req.payload = payload
    next()
}

export default auth