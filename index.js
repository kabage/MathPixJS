require('dotenv').config();
const MathPix = require("./MathPix");
const MathPixPdf = require("./MathPixPdf");
const MathPixStrokes = require("./MathPixStrokes");
const MathPixProcessBatch = require("./MathPixProcessBatch");
const MathPixQuery = require("./MathPixQuery");
const MathPixPdfQuery = require("./MathPixQueryPdf")
const fs = require('fs-extra');
const axios = require('axios').default;
const MathPixQueryPdf = require('./MathPixQueryPdf');
async function main() {
   
    const mathPix = new MathPix(process.env.appID, process.env.appKey, process.env.apiRoot);
    mathPix.setRequestType(MathPix.REQUEST_TYPE.IMAGE_SINGLE);
    // TODO. Test this with the various format options.
    mathPix.setFormats(["text", "latex_simplified", "latex_styled", "mathml", "asciimath", "latex_list"]);
    mathPix.setDataOptions({ include_svg: true, include_latex: false });
    mathPix.setMetadata({ "ownMetadataField1": true });
    // Prevents symbols from unwanted alphabet appearing in the result.
    mathPix.setAlphabetsAllowed({ "ja": false, "ko": false, });
    mathPix.setConfidenceThreshold(0.75);
    mathPix.setConfidenceRateThreshold(0.75);
    mathPix.setIncludeLineData(false);
    mathPix.setIncludeWordData(false);
    mathPix.setIncludeSmiles(false);
    mathPix.setIncludeInchi(false);
    mathPix.setIncludeGeometryData(false);
    mathPix.setAutoRotateConfidenceThreshold(0.99);
    mathPix.setRmSpaces(true);
    mathPix.setRmFonts(false);
    mathPix.setIdiomaticEqnArrays(false);
    mathPix.setNumbersDefaultToMath(true);
    mathPix.setMathInlineDelimiters(["\\(", "\\)"]);
    try {
        await mathPix.setFileLocal("/home/ed/Repositories/mathpix/mathpix-nodejs/images/limit.jpg", "image/jpeg");
    } catch (err) {
        console.log(err);
    }
    let response;
    try {
        response = await mathPix.processFile();
    } catch (error) {
        console.log(error);
    };
    console.log(response.data);


    // mathPix.setFileRemoteUrl("https://raw.githubusercontent.com/Mathpix/api-examples/master/images/algebra.jpg");



    // let response;
    // try {
    //     response = await mathPix.processFile();
    // } catch (error) {
    //     console.log(error);
    // };
    // console.log(response.data);

    const mathPixQueryObj = new MathPixQuery(process.env.appID, process.env.appKey, process.env.apiRoot);
    mathPixQueryObj.setPage(1);
    mathPixQueryObj.setPerPage(99);
    mathPixQueryObj.setFromDate("2021-07-26T11:17:26.913Z");
    mathPixQueryObj.setToDate("2021-07-26T18:48:46.080Z");
    mathPixQueryObj.setIsPrinted(false);
    mathPixQueryObj.setIsHandWritten(true);
    mathPixQueryObj.setContainsDiagram(false);
    let imageQueryResponse;
    try {
        imageQueryResponse = await mathPixQueryObj.queryResult();
    } catch (err) {
        console.log(err);
    }
    console.log(imageQueryResponse.data);
}
main()