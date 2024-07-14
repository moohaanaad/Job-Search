import { Router } from "express";
import * as jobsController from "./jobsController/jobs.controller.js";
import auth from "../../middleware/auth.js";
import { catchError } from "../../utils/asyncHandler.js"
import validate from "../../middleware/validate.js";
import { addJobSchema, applyJobSchema, filterJob, updateJobSchema } from "./jobs.validation.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";


const jobsRouter = Router()

jobsRouter.post('/addJob', auth, validate(addJobSchema), catchError(jobsController.addJob))
jobsRouter.put('/updateJob/:id', auth, validate(updateJobSchema), catchError(jobsController.updateJob))
jobsRouter.delete('/deleteJob/:id', auth, catchError(jobsController.deleteJob))
jobsRouter.get('/getCompanysJobs/:name', auth, catchError(jobsController.getCompanysJobs))
jobsRouter.patch('/filterJobs', auth, validate(filterJob), catchError(jobsController.filterJobs))
jobsRouter.post('/applyJob/:id', fileUpload({ folder: "application", allowType: fileValidation.files }).single('application'), auth, validate(applyJobSchema), catchError(jobsController.applyJob))
jobsRouter.post('/addPdf/:id', fileUpload({ folder: "application", allowType: fileValidation.files }).single('application'), catchError(jobsController.addPdf))
jobsRouter.get('/getCompany', catchError(jobsController.getJobsWithCompany))

export default jobsRouter