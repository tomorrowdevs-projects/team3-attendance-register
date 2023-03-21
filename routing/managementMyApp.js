const queries = require("../model/queries.js");
const express = require("express");
const router = express.Router();
const connection = require("../src/connectMysql.js");
const bcrypt = require("bcryptjs");
const { ErrorCodes } = require("vue");

router.post("/", async (req, res) => {
  const password = req.password;

  const { username, name, surname, email, role } = req;
  await connection()
    .then(async (connection) => {
      await connection.query(queries.use);

      //create cryptoPassowrd
      let hashedPassowrd = await bcrypt.hash(password, 12);
      console.log(hashedPassowrd);
      // //add user inside Db
      await connection.query(queries.createUser, [
        username,
        hashedPassowrd,
        name,
        surname,
        email,
        role,
      ]);
      res.status(200).json({ status: 200 });
    })
    .catch((error) => {
      throw error;
    });
});

module.exports = router;
