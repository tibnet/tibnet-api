import { UserType } from "@prisma/client";

export interface Payload {
    accountId: number,
    entityId: number,
    phone: string,
    role: UserType
}