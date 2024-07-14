import AppError from "./AppError.js"



export const catchError = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => next(new AppError(error.message, error.statusCode)))
    }
}

export const globalErrorHandler = (err, req, res, next) => {
    return res.status(err.statusCode || 500).json({ message: err.message, stack:err.stack, success:false})
}