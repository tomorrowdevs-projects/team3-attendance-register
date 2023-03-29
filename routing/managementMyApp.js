const queries = require("../model/queries.js");
const express = require("express");
const router = express.Router();
const connection = require("../src/connectMysql.js");
const bcrypt = require("bcryptjs");
const { ErrorCodes } = require("vue");

router.post("/", async (req, res) => {
  try {
    const { username, name, surname, email, role, password, category } =
      req.body;
    await connection().then(async (connection) => {
      await connection.query(queries.use);

      //create cryptoPassowrd
      let hashedPassowrd = await bcrypt.hash(password, 12);
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
          .query(queries.select_trainer_category, [username, element])
          .then(async ([rows]) => {
            if (rows.length === 0) {
              connection
                .query(queries.insertInto_category_assignment, [
                  username,
                  element,
                ])
                .then(([rows]) => {
                  //when element is the last inside category
                  if (element == category[category.length - 1])
                    res.json({ status: 201, success: true }).end();
                  else {
                    res.json({ status: 400 }).end();
                  }
                });
            }
          });
      });
      res.json({ status: 401, data: null }).end();
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 401, data: null }).end();
  }
});

module.exports = router;
