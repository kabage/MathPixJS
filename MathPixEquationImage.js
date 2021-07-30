const MathPix = require("./MathPix");
const axios = require('axios').default;
class MathPixEquationImage extends MathPix {
    async processFile() {
        return axios({
            "content-type": "application/json",
            method: "POST",
            headers: {
                app_id: this.appID,
                app_key: this.appKey
            },
            url: "https://api.mathpix.com/v3/latex",
            data: this.mathPixObject,
        });
    }
}
module.exports = MathPixProcessBatch;