import { rejectOrder } from '@controllers/doctor'
import { getCompaines, getCompanyDetails, getCompanyDoctorDetails, getCompanyDoctors, getFeedbackDetails, getFeedbacks, getOrderDetails, getOrders, postOrder, searchDoctors } from '@controllers/pacient'
import { Router } from 'express'

export default Router({ mergeParams: true })
    .get("/companies", getCompaines)
    .get("/companies/:id", getCompanyDetails)
    .get("/companies/:id/doctors", getCompanyDoctors)
    .get("/doctors", searchDoctors)
    .get("/doctors/:doc_id", getCompanyDoctorDetails)
    .get("/orders", getOrders)
    .post("/orders", postOrder)
    .get("/orders/:id", getOrderDetails)
    .get("/orders/:id/reject", rejectOrder)
    .get("/feedbacks", getFeedbacks)
    .get("/feedbacks/:id", getFeedbackDetails)