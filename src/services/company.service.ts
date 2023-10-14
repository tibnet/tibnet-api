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
            isConfirmed: true
        }
    })
}


export const findCompanyDetails = (id: number) => {
    return prisma.company.findFirst({
        where: {
            AND: [
                {
                    id
                },
                {
                    isConfirmed: true
                }
            ]
        },
        select: {
            id: true,
            address: true,
            name: true,
            phone: true,
            telegram: true,
            TIN: true,
            isConfirmed: true
        }
    })
}


export const findCompanes = () => {
    return prisma.company.findMany({
        where: {
            isConfirmed: true
        }
    })
}

export const createCompany = (accountId: number, name: string, address: string, TIN: string, phone: string, telegram: string, countryCode: string) => {
    return prisma.company.create({
        data: {
            name,
            address,
            TIN,
            phone,
            accountId,
            countryCode,
            telegram,
            isConfirmed: false
        }
    })
}