import serverConfig from "@configs/server.config"
import BigBlueButtonApi from "@utils/bbb"

const testParams = {
    name: "random-9998650",
    meetingID: "random-9998650",
    moderatorPW: "mp",
    attendeePW: "ap",
    welcome: "<br>Welcome to <b>%%CONFNAME%%</b>!",
    fullName: "User 8584148",
    password: "mp",
    publish: false,
    random: "416074726",
    record: false,
    recordID: "random-9998650",
    voiceBridge: "75858"
}

const testJoinParams = {
    fullName: "Guest",
    meetingID: "random-9998650",
    password: "mp",
    role: "VIEWER",
}

console.log(serverConfig)

const bbb = new BigBlueButtonApi(serverConfig.tibnetAPI, serverConfig.tibnetSecret)

export const createMeeting = async (params: {} = testParams) => {
    return bbb.query("create", params)
}

export const joinMeeting = async (params: {} = testJoinParams) => {
    return bbb.join(params)
}