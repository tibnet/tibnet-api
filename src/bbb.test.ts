import dotenv from 'dotenv'
dotenv.config()

import { joinMeeting } from "@services/tibnet.service";

async function bootstrap() {
    setTimeout(async () => {
        const join = await joinMeeting()
        console.log("joined", join)
    }, 1000)
}

bootstrap()