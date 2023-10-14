export type VerificationId = string

export interface Verification {
    uid: VerificationId,
    phone: string,
    code: string,
    date: Date
}