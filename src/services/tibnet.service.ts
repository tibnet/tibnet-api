import serverConfig from "@configs/server.config"
import BigBlueButtonApi from "@utils/bbb"

const bbb = new BigBlueButtonApi(serverConfig.tibnetAPI, serverConfig.tibnetSecret)

interface CreateParams {
    name: string,
    meetingID: string,
    fullName: string,
    moderatorPassword: string,
    attendeePassword: string,
    recordID: string,
}

interface JoinParams {
    fullName: string,
    meetingID: string,
    password: string,
    role: "VIEWER" | "MODERATOR",
}

interface RecordParams {
    meetingID: string,
    recordID: string
}

export const createBBBMeeting = async (params: CreateParams) => {
    return bbb.query("create", {
        name: params.name,
        meetingID: params.meetingID,
        moderatorPW: params.moderatorPassword,
        attendeePW: params.attendeePassword,
        fullName: params.fullName,
        password: params.moderatorPassword,
        publish: true,
        random: "416074726",
        record: true,
        recordID: params.recordID,
        autoStartRecording: true,
        allowStartStopRecording: false,
        meetingLayout: "VIDEO_FOCUS",
        learningDashboardEnabled: false,
        disabledFeatures: "presentation,learningDashboard"
    })
}

export const joinBBBMeeting = async (params: JoinParams) => {
    return bbb.join(params)
}

export const findBBBRecords = async (params: RecordParams) => {
    return bbb.query('getRecordings', params)
}