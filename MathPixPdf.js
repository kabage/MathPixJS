const MathPix = require("./MathPix");
const fs = require('fs-extra');
const axios = require('axios').default;
const FormData = require('form-data');
class MathPixPdf extends MathPix {
    setFileRemoteUrl(url = "") {
        this.mathPixObject.url = url;
    }
    setFileLocal(filePath = "", mimeType = "application/pdf") {
        let form = new FormData();
        form.append('file', fs.createReadStream(filePath));
        form.append('options_json', JSON.stringify(this.mathPixObject));
        this.form = form;
    }
    getProcessingStatus(pdfID) {
        return axios({
            method: "GET",
            headers: {
                app_id: this.appID,
                app_key: this.appKey
            },
            url: `https://api.mathpix.com/v3/pdf/${pdfID}`
        });
    }
    getOCRResults(pdfID, resultExtension) {
        // resultExtension can be either tex, mmd or docx.
        return axios({
            method: "GET",
            headers: {
                app_id: this.appID,
                app_key: this.appKey
            },
            url: `https://api.mathpix.com/v3/pdf/${pdfID}.${resultExtension}`
        });
    }
    deletePdfResults(pdfID) {
        return axios({
            method: "DELETE",
            headers: {
                app_id: this.appID,
                app_key: this.appKey
            },
            url: `https://api.mathpix.com/v3/pdf/${pdfID}`
        });
    }
    async processFile() {
        if (this.form) {
            return axios({
                method: "POST",
                headers: {
                    ...this.form.getHeaders(),
                    app_id: this.appID,
                    app_key: this.appKey
                },
                url: "https://api.mathpix.com/v3/pdf-file",
                data: this.form,
            });
        } else {
            return axios({
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    app_id: this.appID,
                    app_key: this.appKey
                },
                url: "https://api.mathpix.com/v3/pdf",
                data: this.mathPixObject,
            });
        }

    }
}
module.exports = MathPixPdf;