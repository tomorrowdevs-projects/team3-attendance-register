const queries = require("../model/queries.js");
const express = require("express");
const connection = require("../src/connectMysql.js");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password

    connection()
      .then(async (connection) => {
        await connection.query(queries.use);
        await connection.query(queries.select).then(([rows]) => {
          //object array filter to search if user exists in the Db
          const result = rows.filter((obj) => {
            return obj.password === password && obj.username === username;
          });
          // If the account exists
          if (result.length === 1) {
            //   // Authenticate the user
            req.session.loggedin = true;
            req.session.username = username;
            //   // Redirect to home page
            res.json({ status: 201, role: rows[0].role });
          } else {
            res.json({ status: 400 }).end();
          }
        });
      })
      .catch((error) => {
        throw error;
      });
  } else {
    res.json({ status: 401 }).end();
  }
});

module.exports = router;
