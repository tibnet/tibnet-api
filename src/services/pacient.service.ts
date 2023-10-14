import prisma from './db'

export const findPacient = (accountId: number) => {
    return prisma.pacient.findUnique({
        where: {
            accountId
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            lastActivity: true
        }
    })
}