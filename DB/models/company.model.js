
import mongoose from "mongoose";


const companySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    industry:String,
    address:{
        type:String,
        required:true
    },
    numberOfEmployees:{
        type: Number,
        min:11,
        max:20
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    companyHR:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const Company = mongoose.model("Company", companySchema)


export default Company