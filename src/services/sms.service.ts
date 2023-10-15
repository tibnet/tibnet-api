import serverConfig from "@configs/server.config"
import axios from "axios"

export const sendCode = async (phone: string, code: string) => {

    const data = {
        "mobile_phone": phone,
        "message": "Tibnet tasdiqlash kodi: " + code,
        "from": "4546",
    }
    
    console.log("Register token: " + serverConfig.smscToken)

    const response = await axios.post("https://notify.eskiz.uz/api/message/sms/send", data, {
        headers: {
            "Authorization": "Bearer " + serverConfig.smscToken
        }
    })

    console.log("Register code: " + response.data)
}