const axios = require('axios')
const bbb = require("bigbluebutton-api-js")
const { toJson } = require('xml2json');

class BigBlueButtonApi {

    constructor(endpoint, secretKey) {
        this.api = new bbb(endpoint, secretKey)
    }

    async query(method, params) {
        const url = this.api.getUrl(method, params)
        const resp = await axios.get(url)
        try {
            return JSON.parse(toJson(resp.data))
        }
        catch(e) {
            return resp.data
        }
    }

    async join(params) {
        return this.api.getUrl('join', params)
    }
}

module.exports = BigBlueButtonApi