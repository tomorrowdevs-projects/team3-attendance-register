const queries = require("../model/queries.js");
const express = require("express");
const connection = require("../connectMysql");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password

    connection()
      .then((connection) => {
        connection.query(queries.select).then(([rows]) => {
          console.log("Response: ", rows);
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
            res.status(201).send({
              redirectTo: "/home",
              msg: "Just go there please",
            });
          } else {
            res.send("Incorrect Username and/or Password!");
          }
        });
      })
      .catch((error) => {
        throw error;
      });
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
});

module.exports = router;
