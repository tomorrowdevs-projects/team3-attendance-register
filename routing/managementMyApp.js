const queries = require("../model/queries.js");
const express = require("express");
const router = express.Router();
const connection = require("../src/connectMysql.js");
const bcrypt = require("bcryptjs");

router.post("/managementMyApp", async (req, res) => {
  console.log(req.body);

  const { username, password, passwordConfirm, name_surname, email, role } =
    req.body;
  await connection()
    .then(async (connection) => {
      await connection.query(queries.use);

      //create cryptoPassowrd
      let hashedPassowrd = await bcrypt.hash(password, 12);
      console.log(hashedPassowrd);
      //add user inside Db
      await connection.query(queries.createUser, [
        username,
        hashedPassowrd,
        name_surname,
        email,
        role,
      ]);
      res.status(201).end();
    })
    .catch((error) => {
      throw error;
    });
});



module.exports = router;
