import { UserType } from '@prisma/client'
import prisma from './db'
import { hashPassword } from './crypto.service'

export const findAccount = (phone: string) => {
    return prisma.account.findUnique({
        where: {
            phone
        }
    })
}

export const createAccount = (phone: string, password: string, role: UserType) => {
    return prisma.account.create({
        data: {
            phone,
            password: hashPassword(password),
            isActive: true,
            isVerified: false,
            role
        }
    })
}

export const verifyAccount = (accountId: number) => {
    return prisma.account.update({
        where: {
            id: accountId
        },
        data: {
            isVerified: true
        }
    })
}

export const activateAccount = (accountId: number) => {
    return prisma.account.update({
        where: {
            id: accountId
        },
        data: {
            isActive: true
        }
    })
}

export const disableAccount = (accountId: number) => {
    return prisma.account.update({
        where: {
            id: accountId
        },
        data: {
            isActive: false
        }
    })
}