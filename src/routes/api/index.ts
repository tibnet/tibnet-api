import { Router } from 'express'
import { errorHandler } from '@middlewares/index'
import authRoutes from './auth.routes'

const router = Router({ mergeParams: true })

router.use('/auth', authRoutes)

router.use(errorHandler)

export default router