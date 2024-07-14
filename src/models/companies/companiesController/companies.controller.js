import Application from "../../../../DB/models/application.model.js"
import Company from "../../../../DB/models/company.model.js"
import User from "../../../../DB/models/user.model.js"
import AppError from "../../../utils/AppError.js"

//add company
export const addCompany = async (req, res, next) => {
    const { role } = req.payload
    if (role !== "company_HR") {

        next(new AppError("you do not have this access", 400))
    }
    const addCompany = await Company.insertMany(req.body)
    return res.status(201).json({ message: "success", addCompany })
}

//update company 
export const updateCompany = async (req, res, next) => {
    const { role, _id } = req.payload
    const { email, name } = req.body
    try {
        const updates = {};
        if (email) updates.email = email;
        if (name) updates.name = name;

        const updateCompany = await Company.findOneAndUpdate({ companyHR: _id }, req.body, { new: true }).populate("companyHR")

        return res.status(200).json({ message: "success", updateCompany });
    } catch (error) {
        next(new AppError(error.message, 400))
    }
}

//delete company 
export const deleteCompany = async (req, res, next) => {
    const { role, _id } = req.payload
    console.log(_id);
    const deleteCompany = await Company.findOneAndDelete({ companyHR: _id }, { new: true })
    if (deleteCompany) {
        return res.status(200).json({ message: "success", deleteCompany });
    }
    next(new AppError("invaled data", 404))
}

//get company
export const getCompany = async(req, res, next) => {
    const { _id, role } = req.payload
    if(role !=="company_HR"){
        next(new AppError("you do not have this access", 404))
    }
    const getdata = await Company.findOne({ companyHR: _id }).populate("companyHR")
    if(getdata){
        return res.status(200).json({message:"success", getdata })
    }
    next(new AppError("invaled data", 404))
}

//Search for a company with a name. 
export const searchCompany = async (req, res, next) => {
    const { name } = req.params
    const find = await Company.findOne({name})
    if(find){
        return res.status(200).json({message:"success",find})
    }
    next(new AppError("company is not defind", 404))
}