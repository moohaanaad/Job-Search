import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        min: 3,
        required: true
    },
    lastName: {
        type: String,
        min: 3,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    recoveryEmail: {
        type: String,
        required: true
    },
    DOB: Date,
    mobileNumber: {
        type: String,
        unique: true,
        required: true
    },

    role: {
        type: String,
        enum: ['user', 'company_HR'],
        required: true
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline'
    },
    code: {
        type: String,
        length: 4
    },
    profilePic: {
        type: String,
        required: true
    },


}, {
    timestamps: true,
    toJSON: { virtuals: true },//
    toObject: { virtuals: true }// 
})
UserSchema.virtual('company', {
    ref: 'Company',
    localField: '_id',
    foreignField: "companyHR"
})
const User = mongoose.model("User", UserSchema)

export default User