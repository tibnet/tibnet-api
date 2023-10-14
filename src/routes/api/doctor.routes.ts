import { confirmOrder, getOrder, getOrders, getPacientDetails, getPacients, rejectOrder } from '@controllers/doctor'
import authenticate from '@middlewares/authenticate'
import { Router } from 'express'

export default Router({ mergeParams: true })
    .use(authenticate('doctor'))
    .get('/pacients', getPacients)
    .get('/pacients/:id', getPacientDetails)
    .get('/orders', getOrders)
    .get('/orders/:id', getOrder)
    .put('/orders/:id/confirm', confirmOrder)
    .put('/orders/:id/reject', rejectOrder)