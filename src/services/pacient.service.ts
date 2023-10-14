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

export const createPacient = (accountId: number, firstName: string, lastName: string) => {
    return prisma.pacient.create({
        data: {
            accountId,
            firstName,
            lastName,
            lastActivity: new Date()
        }
    })
}