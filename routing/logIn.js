require("dotenv").config();

const queries = require("../model/queries.js");
const connection = require("../src/connectMysql.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");

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
              hashPasswordDb = rows[0].password;

              //compare cryptoPassowrd
              let hashedPassowrd = bcrypt.compareSync(password, hashPasswordDb);

              // If the pass is ok and user exist:
              if (hashedPassowrd) {
                connection
                  .query(queries.selectLogin, [username])
                  .then(([rows]) => {
                    const token = jwt.sign(
                      {
                        role: rows[0].role,
                        username: rows[0].username,
                      },
                      process.env.JWT
                    );

                    res
                      .cookie("access_token", token, {
                        httpOnly: true,
                      })
                      .json({ status: 201, data: rows });
                  });
              } else {
                res.json({ status: 401 }).end();
              }
            }
          });
      })
      .catch((error) => {
        throw error;
      });
  } else {
    res.json({ status: 404 }).end();
  }
});

module.exports = router;
