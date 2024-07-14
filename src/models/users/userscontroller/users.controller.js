import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { customAlphabet, nanoid } from "nanoid"
import User from "../../../../DB/models/user.model.js"
import AppError from "../../../utils/AppError.js"
import sendEmail from "../../../utils/sendEmail.js"
//user signUp
export const signUp = async (req, res, next) => {
    const { email, password, firstName, lastName, mobileNumber } = req.body
    try {
        const find = {};
        if (email) find.email = email;
        if (mobileNumber) find.mobileNumber = mobileNumber;
        const hash = bcrypt.hashSync(password, 8)
        req.body.password = hash
        req.body.userName = firstName + "_" + lastName
        const user = await User.insertMany(req.body)
        return res.status(201).json({ message: 'success', user })
    } catch (error) {
        next(new AppError(error.message, 400))
    }
}   
  

//user signIn
export const signIn = async (req, res, next) => {
    const { email, password } = req.body
    const userExist = await User.findOne({ email })
    if (!userExist) {
        next(new AppError("invaled email or password", 404))
    }
    const match = bcrypt.compareSync(password, userExist.password)
    if (!match) {
        next(new AppError("invaled email or password", 404))
    }
    const user = await User.updateOne({ email }, { status: "online" })
    const token = jwt.sign({ email, _id: userExist._id, role: userExist.role }, "lolSystem")
    return res.status(200).json({ message: "success", token })
}

//user update
export const updateUser = async (req, res, next) => {
    const { email, mobileNumber, recoveryEmail, DOB, lastName, firstName } = req.body
    const { _id } = req.payload
    const user = await User.findById(_id)
    if (!user) {
        next(new AppError("user is not defind", 404))
    }

    try {
        const updates = {};
        if (email) updates.email = email;
        if (mobileNumber) updates.mobileNumber = mobileNumber;
        if (recoveryEmail) updates.recoveryEmail = recoveryEmail;
        if (DOB) updates.DOB = DOB;
        if (lastName) updates.lastName = lastName;
        if (firstName) updates.firstName = firstName;

        const updatedUser = await User.findByIdAndUpdate(_id, updates, { new: true, runValidators: true });

        res.send(updatedUser);
    } catch (error) {
        next(new AppError(error.message, 400))
    }
}

//delete user
export const deleteUser = async (req, res, next) => {
    const { _id } = req.payload
    const user = await User.findOneAndDelete({ _id, status: "online" })
    if (user) {
        return res.status(200).json({ message: "success", user })
    }
    next(new AppError("user is not defind", 404))

}

//get user data
export const getUserData = async (req, res, next) => {
    const { _id } = req.payload
    const user = await User.findOne({ _id, status: "online" })
    if (user) {
        return res.status(200).json({ message: "success", user })
    }
    next(new AppError("please login", 400))
}

//update password
export const updatePassword = async (req, res, next) => {
    const { _id } = req.payload
    const { password } = req.body
    const hash = bcrypt.hashSync(password, 8)
    const user = await User.findByIdAndUpdate(_id, { hash })
    if (!user) {
        next(new AppError("user is not defind", 400))
    }
    return res.status(201).json({ message: "success", user })
}

//send Email
export const sendmail = async (req, res, next) => {
    const { email } = req.body
    console.log(email);
    const user = await User.findOne({ email })
    if (!user) {
        next(new AppError("user is not defind", 400))
    }
    const nanoid = customAlphabet("0123456789", 4)
    req.body.code = nanoid()
    sendEmail({ to: email, html: `<h1>${req.body.code}</h1>` })
    const abdelmohsen = await User.updateOne({ email }, { code: req.body.code })
    return res.status(200).json({ message: "email sent" })
}

//forget password
export const forgetPassword = async (req, res, next) => {
    const { password, email, code } = req.body
    const userExist = await User.findOne({ email })
    console.log(userExist);
    if (!userExist || userExist.code == null) {
        next(new AppError("email is not defind", 404))
    }
    const hash = bcrypt.hashSync(password, 8)
    const user = await User.findOneAndUpdate({ email, code }, { password: hash, code: null }, {new:true})
    return res.status(201).json({ message: "success", user })
}

//specific recovery Email
export const recoveryEmail = async (req, res, next) => {
    const { recoveryEmail } = req.body
    const getAll = User.find({recoveryEmail})
    if(!getAll){
        next(new AppError("recovery email is not defind", 404))
    }
    return res.status(200).json({message:"success",getAll})
}

//profile pic
export const addProfilePicture = async (req, res, next) => {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, {profilePic:req.file.path})
    if(user){
        return res.json({message:"success", user})
    }
    next(new AppError("invaled data", 404))
}