import prisma from './db'

export const findDoctorAccount = (accountId: number) => {
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

export const findDoctorDetails = (companyId: number, id: number) => {
    return prisma.doctor.findFirst({
        where: {
            id,
            companyId
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
            },
            services: true,
            workDays: true
        }
    })
}

export const findDoctorsByCompany = (companyId: number) => {
    return prisma.doctor.findMany({
        where: {
            companyId
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
            },
            services: {
                select: {
                    name: true,
                    special: true,
                    price: true,
                }
            },
        }
    })
}

export const createDoctor = (accountId: number, companyId: number, firstName: string, lastName: string, specials: number[], workDays: number[], services: number[]) => {
    return prisma.doctor.create({
        data: {
            accountId,
            firstName,
            lastName,
            companyId,
            services: {
                connect: services.map(id => ({ id }))
            },
            specials: {
                connect: specials.map(id => ({ id }))
            },
            workDays: {
                connect: workDays.map(id => ({ id }))
            },
        }
    })
}
