import { Router } from "express";
import * as userscontroller from "./userscontroller/users.controller.js";
import { catchError } from "../../utils/asyncHandler.js";
import validate from "../../middleware/validate.js";
import { forgetPassword, signInSchema, signUpSchema, updateSchema, sendEmail } from "../../utils/validationSchema.js";
import auth from "../../middleware/auth.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";

const UsersRouter = Router()

UsersRouter.post("/signUp", validate(signUpSchema), catchError(userscontroller.signUp))
UsersRouter.post("/signIn", validate(signInSchema), catchError(userscontroller.signIn))
UsersRouter.put("/update", auth, validate(updateSchema),catchError(userscontroller.updateUser))
UsersRouter.delete("/delete", auth, catchError(userscontroller.deleteUser))
UsersRouter.get("/getUserData", auth, catchError(userscontroller.getUserData))
UsersRouter.patch("/updatePassword", auth, catchError(userscontroller.updatePassword))
UsersRouter.post("/sendEmail", validate(sendEmail), catchError(userscontroller.sendmail))
UsersRouter.post("/forgetPassword", validate(forgetPassword), catchError(userscontroller.forgetPassword))
UsersRouter.post("/recoveryEmail", catchError(userscontroller.recoveryEmail))
UsersRouter.post("/addProfilePicture/:id", fileUpload({folder:"profile", allowType:fileValidation.images}).single('image'), catchError(userscontroller.addProfilePicture))

export default UsersRouter