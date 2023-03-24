const queries = require("../model/queries.js");
const express = require("express");
const router = express.Router();
const connection = require("../src/connectMysql.js");
const bcrypt = require("bcryptjs");
const controller = require("../controller/auth.js");

//edit accounts
router.patch("/:username", async (req, res) => {
  try {
    console.log(req.body)
     const username = req.params.username;
      await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection
        .query(queries.edit_account, [req.body.email, req.body.newUsername, req.body.name, req.body.surname, username])
        .then(async ([rows]) => {
          if (rows) res.json({ status: 201, success: true  }).end()
        else {
          res.json({ status: 400, data: null }).end();
        };
        }); 
    }); 
  } catch (error) { 
    console.log(error) 
  }  
});



router.delete("/del/:username", async (req, res) => {
  try {
    const username = req.params.username;
      await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection.query(queries.deletAccounts, [username]);
      res.json({ status: 201 }).end(); 
    });
   
  } catch (error) {
    res.json({ status: 401 }).end();
    console.log(error)
  }
});

module.exports = router;
