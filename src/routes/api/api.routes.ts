import { Router } from 'express'
import { errorHandler } from '@middlewares/index'
import authRoutes from './auth.routes'
import companyRoutes from './company.routes'

export default Router({ mergeParams: true })
    .use("/auth", authRoutes)
    .use("/company", companyRoutes)
    .use("/doctor")
    .use("/pacient")
    .use(errorHandler)