import joi from "joi";

export const signUpSchema = joi.object({
    firstName:joi.string().min(3).required(),
    lastName:joi.string().min(3).required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repassword:joi.valid(joi.ref("password")).required(),
    recoveryEmail:joi.string().required(),
    DOB:joi.date(),
    mobileNumber:joi.string().required(),
    role:joi.string().required(),   
}).required()

export const signInSchema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
}).required()

export const updateSchema = joi.object({
    firstName:joi.string().min(3),
    lastName:joi.string().min(3),
    email:joi.string().email(),
    mobileNumber:joi.string(),
    recoveryEmail:joi.string(),
    DOB:joi.date()
}).required()

export const sendEmail = joi.object({
    email:joi.string().email().required()
}).required()

export const forgetPassword = joi.object({
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    code:joi.string().required()
}).required()
