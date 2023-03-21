const queries = require("../model/queries.js");
const express = require("express");
const router = express.Router();
const connection = require("../src/connectMysql.js");
const bcrypt = require("bcryptjs");
const controller = require("../controller/auth.js");

//edit accounts
router.patch("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const { email, newUsername, name, surname} = req;
    console.log(newUsername)
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection
      
        .query(queries.edit_accounts, [email, newUsername,  name, surname,username])
        .then(async ([rows]) => {
          if (rows) res.status(201).json({ status: 201 });
        });
    });
  } catch (error) {
    console.log(error)
  }
});




router.delete("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection.query(queries.deletAccounts, [username]);
      res.json({ status: 201 }).end();
    });
  } catch (error) {
    res.json({ status: 401, data: null }).end();
  }
});

module.exports = router;
