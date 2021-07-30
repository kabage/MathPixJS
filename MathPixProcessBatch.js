const axios = require('axios').default;
const MathPix = require("./MathPix");
class MathPixProcessBatch extends MathPix {
    setMathPixObject(mathPix) {
        this.mathPixObject = mathPix.mathPixObject;
    }
    setUrls(urls = []) {
        this.urls = urls;
    }
    async getBatchResponse(batchID) {
        return axios({
            "content-type": "application/json",
            method: "GET",
            headers: {
                app_id: this.appID,
                app_key: this.appKey
            },
            url: `https://api.mathpix.com/v3/batch/${batchID}`,
        });
    }
    async processBatch() {
        return axios({
            "content-type": "application/json",
            method: "POST",
            headers: {
                app_id: this.appID,
                app_key: this.appKey
            },
            url: "https://api.mathpix.com/v3/batch",
            data: {},
        });
    }
}
module.exports = MathPixProcessBatch;