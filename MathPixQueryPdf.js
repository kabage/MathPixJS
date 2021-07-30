const axios = require('axios').default;
class MathPixQueryPdf {
    constructor(appID, appKey, apiRoot) {
        this.appID = appID;
        this.appKey = appKey;
        this.apiRoot = apiRoot;
        this.mathPixQueryObject = {
            page: 1,
            per_page: 100,
            from_date: "",
            to_date: "",
            app_id: "",
        }
        this.mathPixQueryObject.app_id = appID;
        this.requestType = "image/jpeg";
    }
    setPage(page = 1) {
        this.mathPixQueryObject.page = page;
    }
    setPerPage(perPage = 100) {
        this.mathPixQueryObject.per_page = perPage;
    }
    setFromDate(fromDate = "") {
        this.mathPixQueryObject.from_date = fromDate;
    }
    setToDate(toDate = "") {
        this.mathPixQueryObject.to_date = toDate;
    }
    setAppID(appID = []) {
        this.mathPixQueryObject.app_id = appID;
    }
    async queryResult() {
        console.log(this.mathPixQueryObject);
        return axios({
            method: "GET",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                app_id: this.appID,
                app_key: this.appKey
            },
            url: "https://api.mathpix.com/v3/pdf-results",
            params: { ...this.mathPixQueryObject }
        });
    }
}
module.exports = MathPixQueryPdf;