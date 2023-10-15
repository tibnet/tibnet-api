import { nanoid } from 'nanoid'
import prisma from './db'

export const createMeeting = (name: string, ownerId: number, memebers: number[]) => {
    return prisma.meeting.create({
        data: {
            name,
            ownerId,
            members: {
                connect: [...memebers, ownerId].map(memeber => ({
                    id: memeber
                }))
            },
            moderatorPassword: nanoid(8),
            attendeePassword: nanoid(8),
            password: nanoid(8)
        }
    })
}

export const findMeetings = (accountId: number) => {
    return prisma.meeting.findMany({
        where: {
            members: {
                some: {
                    id: accountId
                }
            }
        }
    })
}

export const findMeeting = (id: number) => {
    return prisma.meeting.findUnique({
        where: {
            id
        }
    })
}