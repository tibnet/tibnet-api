import { confirmOrder, getMeetingRecordings, getMeetings, getOrder, getOrders, getPacientDetails, getPacients, joinMeeting, postMeeting, rejectOrder } from '@controllers/doctor'
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
    .get('/meetings', getMeetings)
    .post('/meetings', postMeeting)
    .get('/meetings/:id/join', joinMeeting)
    .get('/meetings/:id/records', getMeetingRecordings)