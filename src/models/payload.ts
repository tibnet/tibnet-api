import { UserType } from "@prisma/client";

export interface Payload {
    entityId: number,
    phone: string,
    role: UserType
}