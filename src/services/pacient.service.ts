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

export const findPacientById = (id: number) => {
    return prisma.pacient.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            lastActivity: true
        }
    })
}

export const findPacientByCompany = (id: number, companyId: number) => {
    return prisma.pacient.findFirst({
        where: {
            id,
            orders: {
                some: {
                    doctor: {
                        companyId
                    }
                }
            }
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

export const findPacientsByDoctor = (doctorId: number) => {
    return prisma.pacient.findMany({
        where: {
            orders: {
                some: {
                    doctorId
                }
            }
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            lastActivity: true
        }
    })
}

export const findPacientsByCompany = (companyId: number) => {
    return prisma.pacient.findMany({
        where: {
            orders: {
                some: {
                    doctor: {
                        companyId
                    }
                }
            }
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            lastActivity: true
        }
    })
}