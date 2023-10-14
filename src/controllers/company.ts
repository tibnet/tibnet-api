import { createAccount, findAccount } from '@services/account.service';
import { createDoctor, findDoctorDetails, findDoctorSchedule, findDoctorsByCompany } from '@services/doctors.service';
import { findFeedbacks } from '@services/feedback.service';
import { findOrderById, findOrdersByCompany, findOrdersByCompanyPacient, findOrdersByDoctor, findOrdersByPacient } from '@services/order.service';
import { findPacientByCompany, findPacientsByCompany, findPacientsByDoctor } from '@services/pacient.service';
import catchAsync from '@utils/catchAsync';

export const getDoctors = catchAsync(async (req, res, next) => {

    const { entityId } = res.locals.payload

    const doctors = await findDoctorsByCompany(entityId)

    res.json({
        success: true,
        doctors
    })
})


export const postDoctor = catchAsync(async (req, res, next) => {
    const { entityId } = res.locals.payload
    const { phone, password, firstName, lastName, specials, workDays, services } = req.body

    const existsAccount = await findAccount(phone)

    if (existsAccount) {
        return res.json({
            success: false,
            message: "Account already exists"
        })
    }

    const account = await createAccount(phone, password, 'doctor')

    await createDoctor(
        account.id, 
        entityId,
        firstName,
        lastName,
        specials,
        workDays,
        services
    )

    res.json({
        success: true,
    })
})

export const getDoctorDetails = catchAsync(async (req, res, next) => {

    const { entityId } = res.locals.payload
    const doctorId = Number(req.params.id)

    const doctor = await findDoctorDetails(entityId, doctorId)

    if (!doctor) {
        return res.json({
            success: false,
            message: "Doctor not found"
        })
    }

    res.json({
        success: true,
        ...doctor
    })
})


export const getDoctorSchedule = catchAsync(async (req, res, next) => {
    const doctorId = Number(req.params.id)
    const start = new Date(String(req.query.start))
    const end = new Date(String(req.query.end))

    const schedule = await findDoctorSchedule(doctorId, start, end)

    res.json({
        success: true,
        schedule
    })
})

export const getDoctorPacients = catchAsync(async (req, res, next) => {

    const doctorId = Number(req.params.id)
    const pacients = await findPacientsByDoctor(doctorId)

    res.json({
        success: true,
        pacients
    })
})


export const getDoctorOrders = catchAsync(async (req, res, next) => {
    const { entityId } = res.locals.payload
    const id = Number(req.params.id)

    const orders = await findOrdersByDoctor(id)
    
    res.json({
        success: true,
        orders
    })
})

export const getPacients = catchAsync(async (req, res, next) => {

    const { entityId } = res.locals.payload
    const pacients = await findPacientsByCompany(entityId)

    res.json({
        success: true,
        pacients
    })
})


export const getPacient = catchAsync(async (req, res, next) => {

    const { entityId } = res.locals.payload
    const id = Number(req.params.id)

    const pacients = await findPacientByCompany(id, entityId)

    res.json({
        success: true,
        pacients
    })
})

export const getPacientOrders = catchAsync(async (req, res, next) => {
    const { entityId } = res.locals.payload
    const id = Number(req.params.id)

    const orders = await findOrdersByCompanyPacient(entityId, id)

    res.json({
        success: true,
        orders
    })
})

export const getOrders = catchAsync(async (req, res, next) => {
    const { entityId } = res.locals.payload

    const orders = await findOrdersByCompany(entityId)

    res.json({
        success: true,
        orders
    })
})

export const getOrder = catchAsync(async (req, res, next) => {

    const id = Number(req.params.id)

    const orders = await findOrderById(id)

    res.json({
        success: true,
        orders
    })
})

export const getFeedbacks = catchAsync(async (req, res, next) => {

    const { entityId } = res.locals.payload

    const feedbacks = await findFeedbacks(entityId)

    res.json({
        success: true,
        feedbacks
    })
})