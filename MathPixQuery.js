const axios = require('axios').default;
class MathPixQuery {
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
            text: "",
            text_display: "",
            latex_styled: "",
            tags: [],
            is_printed: null,
            is_handwritten: null,
            contains_table: null,
            contains_chemistry: null,
            contains_diagram: null,
            contains_triangle: null,
        }
        this.mathPixQueryObject.app_id = appID;
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
    setText(text = "") {
        this.mathPixQueryObject.text = text;
    }
    setTextDisplay(textDisplay = "") {
        this.mathPixQueryObject.text_display = textDisplay;
    }
    setLatexStyled(latexStyled = "") {
        this.mathPixQueryObject.latex_styled = latexStyled;
    }
    setTags(tags = [""]) {
        this.mathPixQueryObject.tags = tags;
    }
    setIsPrinted(isPrinted = false) {
        this.mathPixQueryObject.is_printed = isPrinted;
    }
    setIsHandWritten(isHandWritten = false) {
        this.mathPixQueryObject.is_handwritten = isHandWritten;
    }
    setContainsTable(containsTable = false) {
        this.mathPixQueryObject.contains_table = containsTable;
    }
    setContainsChemistry(containsChemistry = false) {
        this.mathPixQueryObject.contains_chemistry = containsChemistry;
    }
    setContainsDiagram(containsDiagram = false) {
        this.mathPixQueryObject.contains_diagram = containsDiagram;
    }
    setContainsTriangle(containsTriangle = false) {
        this.mathPixQueryObject.contains_triangle = containsTriangle;
    }
    async queryResult() {
        return axios({
            method: "GET",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                app_id: this.appID,
                app_key: this.appKey
            },
            url: "https://api.mathpix.com/v3/ocr-results",
            params: { ...this.mathPixQueryObject }
        });
    }
}
module.exports = MathPixQuery;