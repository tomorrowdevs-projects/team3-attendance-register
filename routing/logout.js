const express = require("express");

const router = express.Router();

router.get('/logout', (req, res)=> { 
  // destroy session data
  req.session = null;
  res.status(200).end();
 });



 module.exports = router