import { Verification, VerificationId } from "@models/verification"
import { nanoid } from "nanoid"

const verficationMap = new Map<VerificationId, Verification>()

const SMS_CODE_EXPIRE_TIME = 5 * 60 * 1000 // 5 mins

export const createVerification = (accountId: number, phone: string, code: string) => {
    const id: VerificationId = nanoid()
    const verfication = {
        uid: id,
        accountId,
        phone,
        code,
        date: new Date()
    }

    verficationMap.set(id, verfication)

    return verfication
}

export const findVerification = (id: VerificationId) => {
    return verficationMap.get(id)
}

export const isVerificationExpired = (verification: Verification) => {
    const now = new Date()
    const target = verification.date
    const difference = now.getTime() - target.getTime()

    return difference >= SMS_CODE_EXPIRE_TIME
}