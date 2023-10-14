import prisma from './db'

export const findFeedbacks = (companyId: number) => {
    return prisma.feedback.findMany({
        where: {
            companyId
        }
    })
}