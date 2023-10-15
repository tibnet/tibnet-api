import { findDoctorAccount } from '@services/doctors.service';
import { createMeeting, findMeeting, findMeetings } from '@services/meeting.service';
import { confirmDoctorOrder, findOrderById, findOrdersByDoctor, rejectDoctorOrder } from '@services/order.service';
import { findDoctorPacientDetails, findPacientsByDoctor } from '@services/pacient.service';
import { createBBBMeeting, findBBBRecords, joinBBBMeeting } from '@services/tibnet.service';
import catchAsync from '@utils/catchAsync';
import { nanoid } from 'nanoid';

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

export const getMeetings = catchAsync(async (req, res, next) => {

    const { accountId } = res.locals.payload

    const meetings = await findMeetings(accountId)

    res.json({
        success: true,
        meetings
    })
})

export const postMeeting = catchAsync(async (req, res, next) => {

    const { accountId } = res.locals.payload
    const { name, pacients } = req.body

    const doctor = await findDoctorAccount(accountId)

    const meeting = await createMeeting(name, accountId, pacients)

    await createBBBMeeting({
        fullName: `${doctor?.firstName} ${doctor?.lastName}`,
        meetingID: meeting.meetingID,
        name: name,
        moderatorPassword: meeting.moderatorPassword,
        attendeePassword: meeting.attendeePassword,
        recordID: meeting.recordID
    })

    const url = await joinBBBMeeting({
        fullName: `${doctor?.firstName} ${doctor?.lastName}`,
        meetingID: meeting.meetingID,
        password: meeting.moderatorPassword,
        role: "MODERATOR"
    })

    res.json({
        success: true,
        meetingUrl: url,
        meetingId: meeting.id
    })
})

export const joinMeeting = catchAsync(async (req, res, next) => {

    const { accountId } = res.locals.payload
    const id = Number(req.params.id)
    
    const doctor = await findDoctorAccount(accountId)

    const meeting = await findMeeting(id)

    if (!meeting) {
        return res.json({
            success: false,
            message: "Meeting not found"
        })
    }

    const url = await joinBBBMeeting({
        fullName: `${doctor?.firstName} ${doctor?.lastName}`,
        meetingID: meeting.meetingID,
        password: meeting.moderatorPassword,
        role: "MODERATOR"
    })

    res.json({
        success: true,
        meetingUrl: url
    })

    res.json({
        success: true,
        ...meeting
    })
})

export const getMeetingRecordings = catchAsync(async (req, res, next) => {

    const id = Number(req.params.id)
    const meeting = await findMeeting(id)

    if (!meeting) {
        return res.json({
            success: false,
            message: "Meeting not found"
        })
    }

    const recordings = await findBBBRecords({
        meetingID: meeting.meetingID,
        recordID: meeting.recordID
    })

    res.json({
        success: true,
        recordings
    })
})