import prisma from './db'

export const findCompany = (accountId: number) => {
    return prisma.company.findUnique({
        where: {
            accountId
        },
        select: {
            id: true,
            address: true,
            name: true,
            phone: true,
            telegram: true,
            TIN: true,
        }
    })
}