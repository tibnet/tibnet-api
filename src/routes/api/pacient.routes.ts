import { rejectOrder } from '@controllers/doctor'
import { getCompaines, getCompanyDetails, getCompanyDoctorDetails, getCompanyDoctors, getFeedbackDetails, getFeedbacks, getMeetings, getOrderDetails, getOrders, joinMeeting, postOrder, searchDoctors } from '@controllers/pacient'
import authenticate from '@middlewares/authenticate'
import { Router } from 'express'

export default Router({ mergeParams: true })
    .use(authenticate('pacient'))
    .get("/companies", getCompaines)
    .get("/companies/:id", getCompanyDetails)
    .get("/companies/:id/doctors", getCompanyDoctors)
    .get("/doctors", searchDoctors)
    .get("/doctors/:doc_id", getCompanyDoctorDetails)
    .get("/orders", getOrders)
    .post("/orders", postOrder)
    .get("/orders/:id", getOrderDetails)
    .put("/orders/:id/reject", rejectOrder)
    .get("/feedbacks", getFeedbacks)
    .get("/feedbacks/:id", getFeedbackDetails)
    .get('/meetings', getMeetings)
    .get('/meetings/:id/join', joinMeeting)