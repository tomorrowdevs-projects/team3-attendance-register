const queries = require("../model/queries.js");
const express = require("express");
const router = express.Router();
const connection = require("../src/connectMysql.js");
const bcrypt = require("bcryptjs");
const { ErrorCodes } = require("vue");

router.post("/", async (req, res) => {
  const { username, name, surname, email, role, password, category } = req.body;
  await connection().then(async (connection) => {
    await connection.query(queries.use);

    //create cryptoPassowrd
    let hashedPassowrd = await bcrypt.hash(password, 12);
    console.log(hashedPassowrd);
    //add user inside Db
    await connection.query(queries.createUser, [
      username,
      hashedPassowrd,
      name,
      surname,
      email,
      role,
    ]);

    //the trainer's category is recorded on the DB
    category.forEach(async (element) => {
      await connection
        .query(queries.insertInto_category_assignment, [username, element])

        .then(([rows]) => {
          if (rows.affectedRows === 0)
            res.json({ status: 201, success: true }).end();

          if (!rows) {
            res.json({ status: 400 }).end();
          }
        })

        .catch((error) => {
          throw error;
        });
    });
  });
});

module.exports = router;
