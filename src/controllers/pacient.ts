import { findCompanes, findCompanyDetails } from '@services/company.service';
import { findDoctorDetails, findDoctorsByCompany, findDoctorsByCriteria } from '@services/doctors.service';
import { findFeedback, findFeedbacksByPacient } from '@services/feedback.service';
import { findMeeting, findMeetings } from '@services/meeting.service';
import { createOrder, findOrderById, findOrdersByPacient, rejectPacientOrder } from '@services/order.service';
import { findPacient } from '@services/pacient.service';
import { joinBBBMeeting } from '@services/tibnet.service';
import catchAsync from '@utils/catchAsync';

export const getCompaines = catchAsync(async (req, res, next) => {

    const companies = await findCompanes()
    
    res.json({
        success: true,
        companies
    })
})

export const getCompanyDetails = catchAsync(async (req, res, next) => {

    const id = Number(req.params.id)

    const company = await findCompanyDetails(id)
    
    res.json({
        success: true,
        ...company
    })
})

export const getCompanyDoctors = catchAsync(async (req, res, next) => {

    const id = Number(req.params.id)

    const doctors = await findDoctorsByCompany(id)
    
    res.json({
        success: true,
        doctors
    })
})

export const searchDoctors = catchAsync(async (req, res, next) => {

    const { name, special } = req.query

    const doctors = await findDoctorsByCriteria(String(name), String(special))
    
    res.json({
        success: true,
        doctors
    })
})

export const getCompanyDoctorDetails = catchAsync(async (req, res, next) => {

    const id = Number(req.params.id)
    const doc_id = Number(req.params.doc_id)

    const doctor = await findDoctorDetails(id, doc_id)
    
    res.json({
        success: true,
        ...doctor
    })
})

export const getOrders = catchAsync(async (req, res, next) => {

    const { entityId } = res.locals.payload

    const orders = await findOrdersByPacient(entityId)

    res.json({
        success: true,
        orders
    })
})

export const postOrder = catchAsync(async (req, res, next) => {

    const { entityId } = res.locals.payload
    const { doctorId, comment } = req.body

    const order = await createOrder(entityId, doctorId, comment)

    res.json({
        success: true,
        ...order
    })
})

export const getOrderDetails = catchAsync(async (req, res, next) => {

    const id = Number(req.params.id)

    const order = await findOrderById(id)

    res.json({
        success: true,
        ...order
    })
})


export const rejectOrder = catchAsync(async (req, res, next) => {

    const id = Number(req.params.id)

    const order = await rejectPacientOrder(id)

    res.json({
        success: true,
        ...order
    })
})

export const getFeedbacks = catchAsync(async (req, res, next) => {
    const { entityId } = res.locals.payload
    
    const feedbacks = await findFeedbacksByPacient(entityId)

    res.json({
        success: true,
        feedbacks
    })
})


export const getFeedbackDetails = catchAsync(async (req, res, next) => {
    
    const id = Number(req.params.id)
    
    const feedback = await findFeedback(id)

    res.json({
        success: true,
        ...feedback
    })
})


export const getMeetings = catchAsync(async (req, res, next) => {

    const { accountId } = res.locals.payload

    const meetings = await findMeetings(accountId)

    res.json({
        success: true,
        meetings
    })
})


export const joinMeeting = catchAsync(async (req, res, next) => {

    const { accountId } = res.locals.payload
    const id = Number(req.params.id)
    
    const pacient = await findPacient(accountId)
    const meeting = await findMeeting(id)

    if (!meeting) {
        return res.json({
            success: false,
            message: "Meeting not found"
        })
    }

    const url = await joinBBBMeeting({
        fullName: `${pacient?.firstName} ${pacient?.lastName}`,
        meetingID: meeting.meetingID,
        password: meeting.attendeePassword,
        role: "VIEWER"
    })

    res.json({
        success: true,
        meetingUrl: url
    })

    res.json({
        success: true,
        meeting
    })
})