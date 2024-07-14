import mongoose from "mongoose";


const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        enum: ['onsite', 'remotely', 'hybrid'],
        required: true
    },
    workingTime: {
        type: String,
        enum: ['part-time', 'full-time'],
        required: true
    },
    seniorityLevel: {
        type: String,
        enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'],
        required:true
    },
    description:{
        type:String,
        required:true
    },
    technicalSkills:{
        type:Array,
        required:true
    },
    softSkills:{
        type:Array,
        required:true
    },
    addedBy:{
        type:String,
        ref:"Company",
        required:true
    }

})

const Job = mongoose.model("Job", JobSchema)

export default Job