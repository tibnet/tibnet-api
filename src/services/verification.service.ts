import { Verification, VerificationId } from "@models/verification"
import { nanoid } from "nanoid"


const verficationMap = new Map<VerificationId, Verification>()

const createVerification = (phone: string, code: string) => {
    const id: VerificationId = nanoid()
    const verfication = {
        uid: id,
        phone,
        code,
        date: new Date()
    }

    verficationMap.set(id, verfication)

    return verfication
}

const findVerification = (id: VerificationId) => {
    return verficationMap.get(id)
}