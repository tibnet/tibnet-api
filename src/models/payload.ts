import { UserType } from "@prisma/client";

export interface Payload {
    phone: string,
    role: UserType
}