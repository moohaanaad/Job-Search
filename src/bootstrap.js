import connection from "../DB/connection.js"
import CompaniesRouter from "./models/companies/companies.router.js"
import jobsRouter from "./models/jobs/jobs.router.js"
import UsersRouter from "./models/users/users.router.js"
import { globalErrorHandler } from "./utils/asyncHandler.js"



function bootstrap (app, express) {
    app.use(express.json())
    connection()
    app.use("/uploads", express.static("uploads"))
    app.use("/users", UsersRouter)
    app.use("/companies", CompaniesRouter)
    app.use("/jobs", jobsRouter)

    app.use(globalErrorHandler)
}

export default bootstrap