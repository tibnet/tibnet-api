import { confirmDoctorOrder, findOrderById, findOrdersByDoctor, rejectDoctorOrder } from '@services/order.service';
import { findDoctorPacientDetails, findPacient, findPacientsByDoctor } from '@services/pacient.service';
import catchAsync from '@utils/catchAsync';

export const getPacients = catchAsync(async (req, res, next) => {

    const { entityId } = res.locals.payload

    const pacients = await findPacientsByDoctor(entityId)

    res.json({
        success: true,
        pacients
    })
})

export const getPacientDetails = catchAsync(async (req, res, next) => {

    const { entityId } = res.locals.payload
    const id = Number(req.params.id)

    const pacient = await findDoctorPacientDetails(entityId, id)

    res.json({
        success: true,
        ...pacient
    })
})

export const getOrders = catchAsync(async (req, res, next) => {

    const { entityId } = res.locals.payload

    const orders = await findOrdersByDoctor(entityId)

    res.json({
        success: true,
        orders
    })
})


export const getOrder = catchAsync(async (req, res, next) => {

    const id = Number(req.params.id)

    const order = await findOrderById(id)

    res.json({
        success: true,
        ...order
    })
})

export const confirmOrder = catchAsync(async (req, res, next) => {

    const id = Number(req.params.id)
    const { meetingDate } = req.body

    await confirmDoctorOrder(id, new Date(meetingDate))

    res.json({
        success: true,
    })
})

export const rejectOrder = catchAsync(async (req, res, next) => {

    const id = Number(req.params.id)

    await rejectDoctorOrder(id)

    res.json({
        success: true,
    })
})