const MathPix = require("./MathPix");
const axios = require('axios').default;
class MathPixStrokes extends MathPix {
    setStrokes(strokes = {}) {
        this.mathPixObject.strokes = strokes;
    }
    processStrokes() {
        return axios({
            method: "POST",
            headers: {
                "content-type": "application/json",
                app_id: this.appID,
                app_key: this.appKey
            },
            url: "https://api.mathpix.com/v3/strokes",
            data: this.mathPixObject,
        });
    }
}
module.exports = MathPixStrokes;