import joi from "joi"

//add Job Schema
export const addJobSchema = joi.object({
    title: joi.string().required(),
    location: joi.string().required(),
    workingTime: joi.string().required(),
    seniorityLevel: joi.string().required(),
    description: joi.string().required(),
    technicalSkills: joi.array().required(),
    softSkills: joi.array().required(),
}).required()

//update job schema
export const updateJobSchema = joi.object({
    title: joi.string(),
    location: joi.string(),
    workingTime: joi.string(),
    seniorityLevel: joi.string(),
    description: joi.string(),
    technicalSkills: joi.array(),
    softSkills: joi.array(),
}).required()

//filter job
export const filterJob = joi.object({
    title: joi.string(),
    location: joi.string(),
    workingTime: joi.string(),
    seniorityLevel: joi.string(),
    technicalSkills: joi.array(),
}).required()

//apply job
export const applyJobSchema = joi.object({
    TechSkills:joi.array().required(),
    SoftSkills:joi.array().required()
}).required()