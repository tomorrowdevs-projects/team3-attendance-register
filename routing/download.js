const express = require("express");
const pdfDocument = require("../pdf_service.js");

const router = express.Router();


router.get("/download", function async(req, res) {
    pdfDocument.buildPdp().then(() => {
      const file = './file/hours.pdf';
      res.download(file);
    });
  });



module.exports = router;
