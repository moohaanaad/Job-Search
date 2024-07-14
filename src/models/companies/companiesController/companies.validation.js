import joi from "joi"

//add company schema
export const addCompanySchema = joi.object({
    name:joi.string().required(),
    description:joi.string().required(),
    address:joi.string().required(),
    email:joi.string().email().required(),
    industry:joi.string(),
    companyHR:joi.string(),
    numberOfEmployees:joi.number().min(11).max(22).required(),
}).required()

//update company schema
export const updateCompanySchema = joi.object({
    name:joi.string(),
    description:joi.string(),
    address:joi.string(),
    email:joi.string().email(),
    industry:joi.string(),
    companyHR:joi.string(),
    numberOfEmployees:joi.number().min(11).max(22),
}).required()