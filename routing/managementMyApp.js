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
      await connection
        .query(queries.createUser, [
          username,
          hashedPassowrd,
          name,
          surname,
          email,
          role,
        ])
        .then(async ([rows]) => {
            category.forEach(async (el) => {
              if (role === "athlete") {
                await connection
                  .query(queries.select_all_from_category_assignment, [el])
                  .then(async ([rows]) => {
                    //athlete already registered in that category
                 

                    if (rows.length > 0) {
                      rows.forEach(async elem => {
                       
                        if (elem.username_trainer !== null) {

                          let username_trainer = elem.username_trainer;
                          let id = elem.id_course;

                          await connection.query(
                            queries.insert_new_athleteToCategory,
                            [elem.username_trainer, el, id, username]
                          );
                        }
                      })
                    }
                  });
              } else {
                await connection.query(queries.insertInto_category_assignment, [
                  username,
                  el,
                ]);
              }
            });
        });
    })
    res.json({ status: 201 }).end();

  } catch (error) {
    res.json({ status: 400 }).end();
    console.log(error);
  }
});



module.exports = router;
