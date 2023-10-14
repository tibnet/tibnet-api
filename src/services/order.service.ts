import { OrderStatus } from '@prisma/client'
import prisma from './db'


const commonOrderSelect = {
    id: true,
    doctor: {
        select: {
            id: true,
            firstName: true,
            lastName: true,
        }
    },
    pacient: {
        select: {
            id: true,
            firstName: true,
            lastName: true,
        }
    },
    comment: true,
    createdAt: true,
    meetingAt: true,
    meetingKey: true,
    status: true
}

export const findOrdersByCompany = (companyId: number) => {
    return prisma.order.findMany({
        where: {
            doctor: {
                companyId
            }
        },
        select: commonOrderSelect
    })
}

export const findOrdersByCompanyPacient = (companyId: number, id: number) => {
    return prisma.order.findMany({
        where: {
            doctor: {
                companyId
            },
            pacientId: id
        },
        select: commonOrderSelect
    })
}

export const findOrderById = (id: number) => {
    return prisma.order.findUnique({
        where: {
            id
        },
        select: commonOrderSelect
    })
}

export const findOrdersByDoctor = (doctorId: number, status?: OrderStatus, startDate?: Date, endDate?: Date) => {
    return prisma.order.findMany({
        where: {
            doctorId,
            AND: [
                {
                    AND: (startDate && endDate) ? ([
                        {
                            meetingAt: {
                                gte: startDate
                            }
                        },
                        {
                            meetingAt: {
                                lte: endDate
                            }
                        },
                    ]) : undefined
                },
                {
                    status
                }
            ]
        },
        select: {
            meetingAt: true,
            pacient: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            },
            status: true
        }
    })
}

export const findOrdersByPacient = (pacientId: number) => {
    return prisma.order.findMany({
        where: {
            pacientId
        },
        select: commonOrderSelect
    })
}