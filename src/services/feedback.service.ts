import prisma from './db'

export const findFeedbacksByCompany = (companyId: number) => {
    return prisma.feedback.findMany({
        where: {
            companyId
        },
        select: {
            id: true,
            title: true,
            text: true,
            status: true,
            pacient: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                }
            },
            answerTitle: true,
            answerText: true,
        }
    })
}

export const findFeedbacksByPacient = (pacientId: number) => {
    return prisma.feedback.findMany({
        where: {
            pacientId
        },
        select: {
            id: true,
            title: true,
            text: true,
            status: true,
            pacient: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                }
            },
            answerTitle: true,
            answerText: true,
        }
    })
}

export const findFeedback = (id: number) => {
    return prisma.feedback.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            title: true,
            text: true,
            status: true,
            pacient: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                }
            },
            answerTitle: true,
            answerText: true,
        }
    })
}