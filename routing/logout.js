const express = require("express");

const router = express.Router();

router.get('/logout', (req, res)=> { 
  // destroy session data
  res.clearCookie()
  res.status(200).end();
 });



 module.exports = router