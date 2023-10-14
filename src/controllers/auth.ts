import { Request, Response, NextFunction } from 'express';
import bcrypt, { compareSync } from "bcrypt";
import { Payload } from '@models/index';
import { sign } from '@services/jwt.service';
import catchAsync from '@utils/catchAsync';
import { findAccount } from '@services/account.service';
import { UserType } from '@prisma/client';
import { findCompany } from '@services/company.service';
import { findDoctor } from '@services/doctors.service';

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

    const payload: Payload = {
        phone,
        role: account.role
    }

    const authToken = await sign(payload)

    if (account.role == UserType.company) {

        const company = await findCompany(account.id)

        return res.json({
            success: true,
            phone,
            company,
            role: account.role,
            token: authToken,
        })
    }

    if (account.role == UserType.doctor) {

        const doctor = await findDoctor(account.id)

        return res.json({
            success: true,
            phone,
            doctor,
            role: account.role,
            token: authToken,
        })
    }

    if (account.role == UserType.pacient) {

        const pacient = await findDoctor(account.id)

        return res.json({
            success: true,
            phone,
            pacient,
            role: account.role,
            token: authToken,
        })
    }

    return res.json({
        success: false,
        message: `Internal Server account type invalidation: ${account.role}`
    })
})

export const checkPhone = catchAsync(async (req, res, next) => {
    const { phone } = req.query
})

export const register = catchAsync(async (req, res, next) => {

})

export const verify = catchAsync(async (req, res, next) => {

})