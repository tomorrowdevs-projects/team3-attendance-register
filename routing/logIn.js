const queries = require("../model/queries.js");
const express = require("express");
const connection = require("../src/connectMysql.js");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    connection()
      .then(async (connection) => {
        await connection.query(queries.use);
        //find the cryptoPassword in Db  
        await connection
          .query(queries.passwordAndRole, [username])
          .then(([rows]) => {  
            //if there is no password, therefore user inside DB
            if (rows.length === 0) res.json({ status: 400 }).end();
            else {
              //NOTE : to fi when we'll solve the problem with unique inside queries
              hashPasswordDb = rows[0].password;
 
              //compare cryptoPassowrd
              let hashedPassowrd = bcrypt.compareSync(password, hashPasswordDb);

              // If the pass is ok and user exist:
              

              if (hashedPassowrd) {
                //   // Authenticate the user
                req.session.loggedin = true;
                req.session.username = username;
                req.session.role = rows[0].role;

                  connection.query(queries.selectLogin, [username])
                  .then(([rows]) => {  
                
                res.json({ status: 201, data: rows})})
              } else {
                res.json({ status: 401 }).end();
              }
            }
          })
      })
      .catch((error) => {
        throw error;
      });
  } else {
    res.json({ status: 404 }).end();
  }
});

module.exports = router;
