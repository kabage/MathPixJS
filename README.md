# Mathpix JS api wrapper
### Process and image
```js 
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
```
### Process strokes
```js 
 let strokesString;
    try {
        strokesString = await fs.readFile("./strokes.json", { encoding: 'utf-8' });
    } catch (err) {
        console.log(err)
    }
    const mathPixStrokesObj = new MathPixStrokes(process.env.appID, process.env.appKey, process.env.apiRoot);
    //Input formated as {"strokes": {"x": 0,"y": 1}}
    mathPixStrokesObj.setStrokes(JSON.parse(strokesString));
    mathPixQueryObj.setFromDate("2021-07-26T11:17:26.913Z");
    mathPixQueryObj.setToDate("2021-07-26T18:48:46.080Z");
    let strokesResults;
    try {
        strokesResults = await mathPixStrokesObj.processStrokes();
    } catch (err) {
        console.log(err.response.data);
    }
    console.log(strokesResults.data);
```
### Query Image Results
```js
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
        imageQueryResponse = await mathPixQueryObj.queryImageResult();
    } catch (err) {
        console.log(err);
    }
    console.log(imageQueryResponse.data);
```
### Process remote pdf.
```js
    const mathPixPdfRemoteObj = new MathPixPdf(process.env.appID, process.env.appKey, process.env.apiRoot);
    mathPixPdfRemoteObj.setFileRemoteUrl("http://cs229.stanford.edu/notes2020spring/cs229-notes1.pdf");
    let pdfRemoteResponse;
    try {
        pdfRemoteResponse = await mathPixPdfRemoteObj.processFile();
    } catch (err) {
        console.log(err.response.data);
    };
    console.log(`pdf id is ${pdfRemoteResponse.data.pdf_id}`);
```
### Process local pdf.
```js
    const mathPixPdfLocalObj = new MathPixPdf(process.env.appID, process.env.appKey, process.env.apiRoot);
    mathPixPdfLocalObj.setFileLocal("/home/images/cs-notes.pdf", "application/pdf");
    let pdfLocalResponse;
    try {
        pdfLocalResponse = await mathPixPdfLocalObj.processFile();
    } catch (err) {
        console.log(err.response.data);
    };
    console.log(`pdf id is ${pdfLocalResponse.data.pdf_id}`);
```
### Get pdf processing status.
```js
    const fileID = "6f5b9291fab69bd7e94f59e3f1ea93d2";
    const mathPixPdfObj = new MathPixPdf(process.env.appID, process.env.appKey, process.env.apiRoot);
    let pdfProcessingStatus;
    try {
           pdfProcessingStatus = await mathPixPdfObj.getProcessingStatus(fileID);
     } catch (err) {
       console.log(err);
     }
   console.log(pdfProcessingStatus.data);
```

### Get pdf OCR result.
```js
    const fileID = "6f5b9291fab69bd7e94f59e3f1ea93d2";
    const fileExtension = "mmd";
    const filePath = "./"
    const mathPixPdfObj = new MathPixPdf(process.env.appID, process.env.appKey, process.env.apiRoot);
    let pdfOCRResults;
    try {
        pdfOCRResults = await mathPixPdfObj.getOCRResults(fileID, fileExtension);
    } catch (err) {
        console.log(err);
    }
    await fs.writeFile(`${filePath}${fileID}.${fileExtension}`, pdfOCRResults.data);
```

### Delete pdf results.
```js
    const mathPixPdfObj = new MathPixPdf(process.env.appID, process.env.appKey, process.env.apiRoot);
    let pdfDeleteResults;
    try {
        pdfDeleteResults = await mathPixPdfObj.deletePdfResults("62f960730f3f107826c3e10636d7096a");
    } catch (err) {
        console.log(err.response.data);
    }
    console.log(pdfDeleteResults);
```
