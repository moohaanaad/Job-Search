import { Router } from "express";
import * as companiesController from "./companiesController/companies.controller.js";
import auth from "../../middleware/auth.js"
import { catchError } from "../../utils/asyncHandler.js";
import validate from "../../middleware/validate.js";
import { addCompanySchema, updateCompanySchema } from "./companiesController/companies.validation.js";
const CompaniesRouter = Router()

CompaniesRouter.post("/addCompany", auth, validate(addCompanySchema), catchError(companiesController.addCompany))
CompaniesRouter.put("/updateCompany", auth, validate(updateCompanySchema), catchError(companiesController.updateCompany))
CompaniesRouter.delete("/deleteCompany", auth,catchError(companiesController.deleteCompany))
CompaniesRouter.get("/getCompany", auth,catchError(companiesController.getCompany))
CompaniesRouter.get("/getSpecificJob/:industry", catchError(companiesController.getSpecificJob))

export default CompaniesRouter