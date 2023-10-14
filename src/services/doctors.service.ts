import prisma from './db'

export const findDoctor = (accountId: number) => {
    return prisma.doctor.findUnique({
        where: {
            accountId
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            specials: {
                select: {
                    name: true,
                    tags: true
                }
            }
        }
    })
}