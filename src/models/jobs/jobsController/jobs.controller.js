import Application from "../../../../DB/models/application.model.js"
import Company from "../../../../DB/models/company.model.js"
import Job from "../../../../DB/models/job.model.js"
import AppError from "../../../utils/AppError.js"


//add job
export const addJob = async (req, res, next) => {
    const { role, _id } = req.payload
    if (role !== "company_HR") {
        next(new AppError('you do not have this access', 400))
    }
    req.body.addedBy = _id
    const job = await Job.insertMany(req.body)
    if (job) {
        return res.status(201).json({ message: "success", job })
    }
    next(new AppError("invaled data", 404))
}

//update job 
export const updateJob = async (req, res, next) => {
    const { _id, role } = req.payload
    const { id } = req.params
    if (role !== "company_HR") {
        next(new AppError('you do not have this access', 400))
    }
    const findCompany = await Company.findOne({ companyHR: _id })
    const companyName = findCompany.name
    const job = await Job.findOneAndUpdate({ _id: id, addedBy: companyName }, req.body, { new: true })
    if (job) {
        return res.status(200).json({ message: "success", job })
    }
    next(new AppError('invaled data', 404))
}

//delete job
export const deleteJob = async (req, res, next) => {
    const { _id, role } = req.payload
    const { id } = req.params
    if (role !== "company_HR") {
        next(new AppError('you do not have this access', 400))
    }
    const findCompany = await Company.findOne({ companyHR: _id })
    const companyName = findCompany.name
    const job = await Job.findOneAndDelete({ _id: id, addedBy: companyName })
    if (job) {
        return res.status(200).json({ message: "success", job })
    }
    next(new AppError('job is not defind', 404))
}


//Get all Jobs for a specific company
export const getCompanysJobs = async (req, res, next) => {
    const { name } = req.params
    const jobs = await Job.find({ addedBy: name })
    if (jobs) {
        return res.status(200).json({ mssage: "success", jobs })
    }
    next(new AppError("invaled data", 400))
}

//filter jobs
export const filterJobs = async (req, res, next) => {
    const qurey = {}
    if (req.body.workingTime) {
        qurey.workingTime = req.body.workingTime
    }
    if (req.body.location) {
        qurey.location = req.body.location
    }
    if (req.body.seniorityLevel) {
        qurey.seniorityLevel = req.body.seniorityLevel
    }
    if (req.body.title) {
        qurey.title = req.body.title
    }
    if (req.body.technicalSkills) {
        qurey.technicalSkills = req.body.technicalSkills
    }
    console.log(qurey);
    const jobs = await Job.find(qurey)
    if (jobs) {
        return res.status(200).json({ mesasge: "success", jobs })
    }
    next(new AppError("invaled data", 404))
}


//Apply to Job
export const applyJob = async (req, res, next) => {
    const { role, _id } = req.payload
    const { id } = req.params
    if (role !== "user") {
        next(new AppError('you do not have this access', 400))
    }
    const job = await Job.findById(id)
    if (job) {
        req.body.jobId = id
        req.body.userId = _id
        const app = await Application.insertMany(req.body)
        if (app) {
            return res.status(201).json({ message: "success", app })
        }
    }
    next(new AppError('invaled data', 404))
}

export const addPdf = async (req, res, next) => {
    const { id } = req.params
    const app = await Application.findByIdAndUpdate(id, { userResume: req.file.path }, { new: ture })
    if (app) {
        return res.status(201).json({ message: "success", app })
    }
    next(new AppError("invaled data", 404))
}

// getJobsWithCompany
export const getJobsWithCompany = async (req, res, next) => {
    const result = await Job.find().populate([{ path: "addedBy", select: '_id', populate: [{ path: "company",populate:[{path:"companyHR"}] }] }])
    console.log(result);
    res.json({ result })
    // result ={data of job,addedBy:{data Of user }}
}