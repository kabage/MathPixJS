const axios = require('axios').default;
const fs = require('fs-extra');
const FormData = require('form-data');
class MathPix {
    constructor(appID, appKey, apiRoot) {
        this.appID = appID;
        this.appKey = appKey;
        this.apiRoot = apiRoot;
        this.mathPixObject = {
            src: "",
            // Optional key value object.
            metadata: {},
            tags: [],
            formats: [],
            // Boolean options used to return elements of the image output.
            // Are all optional.
            // TODO. Are these parameters meant to be true by default?
            data_options: {
                include_svg: false,
                include_table_html: false,
                include_latex: false,
                include_tsv: false,
                include_asciimath: false,
                include_mathml: false
            },
            include_detected_alphabets: false,
            alphabets_allowed: {
                "hi": true,
                "zh": true,
                "ja": true,
                "ko": true,
                "ru": true,
                "th": true
            },
            confidence_threshold: 0.75,
            confidence_rate_threshold: 0.75,
            include_line_data: false,
            include_word_data: true,
            include_smiles: false,
            include_inchi: false,
            include_geometry_data: false,
            auto_rotate_confidence_threshold: 0.99,
            rm_spaces: true,
            rm_fonts: false,
            idiomatic_eqn_arrays: false,
            numbers_default_to_math: false,
            math_inline_delimiters: ["\\(", "\\)"],
            math_display_delimiters: ["\\(", "\\)"]
        }
        this.requestType = "image/jpeg";
    }
    static REQUEST_TYPE = {
        IMAGE_SINGLE: "text",
        IMAGE_BATCH: "batch",
        PDF_SINGLE: "pdf",
        STROKES: "strokes",
        OCR_RESULTS: "ocr-results",
        PDF_RESULTS: "pdf-results"
    }
    async setFileLocalB64(filePath = "", mimeType = "image/jpeg") {
        // This approach is deprecated. Use 
        return fs.readFile(filePath, { encoding: 'base64' }).then(fileBase64 => {
            this.mathPixObject.src = `data:${mimeType};base64,${fileBase64}`
        });
    }
    setFileLocal(filePath = "", mimeType = "image/jpeg") {
        let form = new FormData();
        form.append('file', fs.createReadStream(filePath));
        form.append('options_json', JSON.stringify(this.mathPixObject));
        this.form = form;
    }
    setRequestType(requestType) {
        this.requestType = requestType;
    }
    setFileRemoteUrl(url = "") {
        this.mathPixObject.src = url;
    }
    setMetadata(metadata = {}) {
        Object.assign(this.mathPixObject.metadata, metadata);
    }
    setTags(tags = []) {
        this.mathPixObject.tags = tags;
    }
    setFormats(formats = []) {
        this.mathPixObject.formats = formats;
    }
    setDataOptions(data_options = {}) {
        Object.assign(this.mathPixObject.data_options, data_options);
    }
    setAlphabetsAllowed(alphabetsAllowed) {
        // Prevents symbols from unwanted alphabet appearing in the result.
        // All alphabets allowed by default.
        Object.assign(this.mathPixObject.alphabets_allowed, alphabetsAllowed);
    }
    setConfidenceThreshold(confidenceThreshold = 0.75) {
        // Specifies threshold for triggering confidence errors. Between 0 and 1.
        this.mathPixObject.confidence_threshold = confidenceThreshold;
    }
    setConfidenceRateThreshold(confidenceRateThreshold = 0.75) {
        // Specifies threshold for triggering confidence errors. Between 0 and 1.
        // (symbol level threshold)
        this.mathPixObject.confidence_rate_threshold = confidenceRateThreshold;
    }
    setIncludeLineData(includeLineData = false) {
        // Specifies whether to return information segmented line by line.
        // ie see LineData object.
        this.mathPixObject.include_line_data = includeLineData;
    }
    setIncludeWordData(includeWordData = false) {
        // Specifies whether to return information segmented word by word.
        // ie WordData object.
        this.mathPixObject.include_word_data = includeWordData;
    }
    setIncludeSmiles(includeSmiles = false) {
        // Enable experimental chemistry diagram OCR,
        // via RDKIT normalized SMILES with isomericSmiles=False,
        // included in text output format, via MMD SMILES syntax <smiles>...</smiles>
        this.mathPixObject.include_smiles = includeSmiles;
    }
    setIncludeInchi(includeInchi) {
        // Include InChI data as XML attributes inside <smiles> elements,
        // for examples <smiles inchi="..." inchikey="...">...</smiles>;
        // only applies when include_smiles is true
        this.mathPixObject.include_inchi = includeInchi;
    }
    setIncludeGeometryData(includeGeometryData = false) {
        // Enable data extraction for geometry diagrams (currently only supports triangle diagrams).
        // ie see GeometryData
        this.mathPixObject.include_geometry_data = includeGeometryData;
    }
    setAutoRotateConfidenceThreshold(autoRotateConfidenceThreshold = 0.99) {
        // Specifies threshold for auto rotating image to correct orientation
        this.mathPixObject.auto_rotate_confidence_threshold = autoRotateConfidenceThreshold;
    }
    setRmSpaces(rmSpaces = true) {
        // Determines whether extra white space is removed from equations,
        // in latex_styled and text formats. Default is true
        this.mathPixObject.rm_spaces = rmSpaces;
    }
    setRmFonts(rmFonts = false) {
        // Determines whether font commands such as \mathbf and \mathrm are removed from equations,
        // in latex_styled and text formats.
        this.mathPixObject.rm_fonts = rmFonts;
    }
    setIdiomaticEqnArrays(idiomaticEqnArrays = false) {
        // Specifies whether to use aligned or gathered,
        // instead of an array environment for a list of equations
        this.mathPixObject.idiomatic_eqn_arrays = idiomaticEqnArrays;
    }
    setNumbersDefaultToMath(numbersDefaultToMath = false) {
        // Specifies whether numbers are always math,
        // e.g., Answer: \( 17 \) instead of Answer: 17
        this.numbers_default_to_math = numbersDefaultToMath;
    }
    setMathInlineDelimiters(mathInlineDelimiters = []) {
        // Specifies begin inline math and end 
        // inline math delimiters for text outputs
        this.mathPixObject.math_inline_delimiters = mathInlineDelimiters;
    }
    setMathDisplayDelimiters(mathDisplayDelimiters) {
        // Specifies begin display math and end display,
        // math delimiters for text outputs
        this.mathPixObject.math_display_delimiters = mathDisplayDelimiters;
    }
    getMathPixObject() {
        return this.mathPixObject;
    }
    async processFileB64() {
        return axios({
            method: "POST",
            headers: {
                "content-type": "application/json",
                app_id: this.appID,
                app_key: this.appKey
            },
            url: "https://api.mathpix.com/v3/text",
            data: this.mathPixObject,
        });
    }
    async processFile() {
        return axios({
            method: "POST",
            headers: {
                ...this.form.getHeaders(),
                app_id: this.appID,
                app_key: this.appKey
            },
            url: "https://api.mathpix.com/v3/text",
            data: this.form,
        });
    }
}
module.exports = MathPix;