import { Router } from 'express'
import { errorHandler } from '@middlewares/index'
import authRoutes from './auth.routes'
import companyRoutes from './company.routes'
import doctorRoutes from './doctor.routes'
import pacientRoutes from './pacient.routes'

export default Router({ mergeParams: true })
    .use("/auth", authRoutes)
    .use("/company", companyRoutes)
    .use("/doctor", doctorRoutes)
    .use("/pacient", pacientRoutes)
    .use(errorHandler)