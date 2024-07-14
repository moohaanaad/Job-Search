import mongoose from "mongoose";


const applicationSchema = new mongoose.Schema({
    jobId:{
        type:mongoose.Types.ObjectId,
        ref:"Job",
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    TechSkills:{
        type:Array,
        required:true
    },
    SoftSkills:{
        type:Array,
        required:true
    },
    userResume :{
        type:String,
    }
})

const Application = mongoose.model("Application", applicationSchema)

export default Application