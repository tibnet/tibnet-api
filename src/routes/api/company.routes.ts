import { getDoctorDetails, getDoctorOrders, getDoctorPacients, getDoctorSchedule, getDoctors, getOrder, getOrders, getPacient, getPacientOrders, getPacients, postDoctor } from '@controllers/company'
import authenticate from '@middlewares/authenticate'
import { Router } from 'express'

export default Router({ mergeParams: true })
    .use(authenticate('company'))
    .get('/doctors', getDoctors)
    .post('/doctors', postDoctor)
    .get('/doctors/:id', getDoctorDetails)
    .get('/doctors/:id/schedule', getDoctorSchedule)
    .put('/doctors/:id', ) // TODO: implement doctor update
    .get('/doctors/:id/pacients', getDoctorPacients)
    .get('/doctors/:id/orders', getDoctorOrders)
    .get('/pacients', getPacients)
    .get('/pacients/:id', getPacient)
    .get('/pacients/:id/orders', getPacientOrders)
    .get('/orders', getOrders)
    .get('/orders/:id', getOrder)