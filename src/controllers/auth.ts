import { compareSync } from "bcrypt";
import { Payload } from '@models/index';
import { sign } from '@services/jwt.service';
import catchAsync from '@utils/catchAsync';
import { createAccount, findAccount, verifyAccount } from '@services/account.service';
import { UserType } from '@prisma/client';
import { createCompany, findCompany } from '@services/company.service';
import { findDoctorAccount } from '@services/doctors.service';
import { createVerification, findVerification, isVerificationExpired } from "@services/verification.service";
import randomCode from "@utils/randomCode";
import { createPacient, findPacient } from "@services/pacient.service";
import { sendCode } from "@services/sms.service";

export const login = catchAsync(async (req, res, next) => {
    const { phone, password } = req.body

    const account = await findAccount(phone)

    if (!account) {
        return res.json({
            success: false,
            message: "Account not found"
        })
    }

    const matchPasswords = compareSync(password, account.password)

    if (!matchPasswords) {
        return res.json({
            success: false,
            message: "Wrong authentication credentials"
        })
    }

    if (!account.isActive) {
        return res.json({
            success: false,
            message: "Your account disabled"
        })
    }

    if (!account.isVerified) {
        return res.json({
            success: false,
            message: "Your account phone number is not verified"
        })
    }

    if (account.role == UserType.company) {

        const company = await findCompany(account.id)

        if (!company?.isConfirmed) {
            return res.json({
                success: false,
                message: "Your account is not confirmed"
            })
        }

        const payload: Payload = {
            accountId: account.id,
            entityId: company.id,
            phone,
            role: account.role
        }
    
        return res.json({
            success: true,
            phone,
            company,
            role: account.role,
            token: await sign(payload),
        })
    }

    if (account.role == UserType.doctor) {

        const doctor = await findDoctorAccount(account.id)
        
        const payload: Payload = {
            accountId: account.id,
            entityId: doctor!.id,
            phone,
            role: account.role
        }

        return res.json({
            success: true,
            phone,
            doctor,
            role: account.role,
            token: await sign(payload),
        })
    }

    if (account.role == UserType.pacient) {

        const pacient = await findPacient(account.id)
        
        const payload: Payload = {
            accountId: account.id,
            entityId: pacient!.id,
            phone,
            role: account.role
        }

        return res.json({
            success: true,
            phone,
            pacient,
            role: account.role,
            token: await sign(payload),
        })
    }

    return res.json({
        success: false,
        message: `Internal Server account type invalidation: ${account.role}`
    })
})

export const checkPhone = catchAsync(async (req, res, next) => {
    const { phone } = req.query

    const account = await findAccount(String(phone).trim())

    console.log(account)
    console.log(account != null)

    return res.json({
        allowLogin: account != null
    })
})

export const register = catchAsync(async (req, res, next) => {
    const { type, phone, password, pacinet, company } = req.body
    
    const existsAccount = await findAccount(phone)

    if (existsAccount) {
        return res.json({
            success: false,
            message: "Phone number already exists"
        })
    }

    const account = await createAccount(phone, password, type)

    if (type == UserType.company) {
        await createCompany(
            account.id,
            company.name,
            company.address,
            company.TIN,
            company.phone,
            company.telegram,
            company.countryCode
        )
    }
    else if (type == UserType.pacient) {
        await createPacient(
            account.id, 
            pacinet.firstName,
            pacinet.lastName
        )
    }
    else {
        return res.json({
            success: false,
            message: `Internal Server account type invalidation: ${type}`
        })
    }

    const smsCode = randomCode()

    sendCode(phone, smsCode)

    return res.json({
        success: true,
        smsCode,
        verificationId: createVerification(account.id, phone, smsCode).uid
    })
})

export const verify = catchAsync(async (req, res, next) => {
    const { vid: verificationId, code } = req.query

    const verfication = findVerification(String(verificationId))

    if (!verfication) {
        return res.json({
            success: false,
            message: "Invalid verification id"
        })
    }

    if (isVerificationExpired(verfication)) {
        return res.json({
            success: false,
            message: "Verification expired"
        })
    }

    if (verfication.code != String(code)) {
        return res.json({
            success: false,
            message: "Wrong verification code"
        })
    }

    const account = await verifyAccount(verfication.accountId)

    if (account.role == UserType.company) {

        const company = await findCompany(account.id)

        if (!company?.isConfirmed) {
            return res.json({
                success: false,
                message: "Your account is not confirmed"
            })
        }
        
        const payload: Payload = {
            accountId: account.id,
            entityId: company!.id,
            phone: account.phone,
            role: account.role
        }

        return res.json({
            success: true,
            phone: account.phone,
            company,
            role: account.role,
            token: await sign(payload),
        })
    }

    if (account.role == UserType.pacient) {

        const pacient = await findPacient(account.id)

        const payload: Payload = {
            accountId: account.id,
            entityId: pacient!.id,
            phone: account.phone,
            role: account.role
        }

        return res.json({
            success: true,
            phone: account.phone,
            pacient,
            role: account.role,
            token: await sign(payload),
        })
    }

    return res.json({
        success: false,
        message: `Internal Server account type invalidation: ${account.role}`
    })
})