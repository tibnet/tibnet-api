import serverConfig from "@configs/server.config"
import BigBlueButtonApi from "@utils/bbb"

const bbb = new BigBlueButtonApi(serverConfig.tibnetAPI, serverConfig.tibnetSecret)

interface CreateParams {
    name: string,
    meetingID: string,
    fullName: string,
    password: string,
    recordID: string,
}


interface JoinParams {
    fullName: string,
    meetingID: string,
    password: string,
    role: "VIEWER" | "MODERATOR",
}

export const createBBBMeeting = async (params: CreateParams) => {
    return bbb.query("create", {
        name: params.name,
        meetingID: params.meetingID,
        moderatorPW: "mp",
        attendeePW: "ap",
        fullName: params.fullName,
        password: params.password,
        publish: true,
        random: "416074726",
        record: true,
        recordID: params.recordID,
        voiceBridge: "75858"
    })
}

export const joinBBBMeeting = async (params: JoinParams) => {
    return bbb.join(params)
}