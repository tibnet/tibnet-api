import { Router } from 'express'
import { errorHandler } from '@middlewares/index'
import authRoutes from './auth.routes'

export default Router({ mergeParams: true })
    .use("/auth", authRoutes)
    .use(errorHandler)
