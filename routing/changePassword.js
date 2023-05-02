require("dotenv").config();

const queries = require("../model/queries.js");
const connection = require("../src/connectMysql.js");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

router.put("/", async (req, res) => {
  // extract password and new password from the request body
  const { password, newPassword } = req.body;

  // create a database connection and execute the following code
  connection()
    .then(async (connection) => {
      // select the database to use
      await connection.query(queries.use);

      // get the user's password and role from the database
      await connection
        .query(queries.passwordAndRole, [req.username])
        .then(async ([rows]) => {
          // if there is no password, therefore user inside DB
          if (rows.length === 0) {
            res.json({ status: 400 }).end();
          } else {
            // extract the hashed password from the database
            let hashPasswordDb = rows[0].password;

            // compare the entered password with the hashed password from the database
            let hashedPassword = (password, hashPasswordDb);

            // if the password is correct and the user exists
            if (hashedPassword) {
              // hash the new password using bcrypt
              let newHashedPassword = await bcrypt.hash(newPassword, 12);

              // update the user's password in the database
              connection
                .query(queries.updatePassword, [
                  newHashedPassword,
                  req.username,
                ])
                .then((rows) => {
                  console.log(rows);
                  if (rows[0].affectedRows === 1) {
                    // if the password is successfully updated, return a success status code
                    res.json({ status: 201 });
                  }
                });
            } else {
              // if the password is incorrect, return an error status code
              res.json({ status: 402 });
            }
          }
        });
    })
    .catch((error) => {
      // if an error occurs, return a server error status code and throw the error
      res.json({ status: 500 });
      throw error;
    }); 
});

module.exports = router;
