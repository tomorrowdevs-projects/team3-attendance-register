const express = require("express");
const cookies = require("cookie-parser");

const router = express.Router();

router.get('/logout', (req, res)=> { 
  // destroy session data
  res
  .clearCookie("access_token")
  .status(200)
  .end();
 });



 module.exports = router