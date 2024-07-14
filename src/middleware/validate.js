import AppError from "../utils/AppError.js"


const validate = (fn) => {
    return (req, res, next) => {
        const { error } = fn.validate(req.body, { abortEarly: false })
        if (error) {
            const errorArray = error.details.map(ele => ele.message)
            req.errorArray = errorArray
            next(new AppError(req.errorArray, 401))
        }
        next()
    }
}

export default validate