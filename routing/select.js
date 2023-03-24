const queries = require("../model/queries.js");
const express = require("express");
const connection = require("../src/connectMysql.js");
const router = express.Router();

router.get("/select", (req, res) => {
  connection().then(async (connection) => {
    await connection.query(queries.use);
    await connection
      .query(queries.selectTrainerorAtlete)
      .then(([rows]) => {
        res.status(200).json({ status: 200, code: rows });
      });
  });
});

module.exports = router;
