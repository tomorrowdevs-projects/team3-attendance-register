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

      //create hashed password using bcrypt
      let hashedPassword = await bcrypt.hash(password, 12);

      //insert new user into database
      await connection.query(queries.createUser, [
        username,
        hashedPassword,
        name,
        surname,
        email,
        role,
      ]).then(async ([rows]) => {
        //assign user to categories if necessary
        category.forEach(async (el) => {
          if (role === "athlete") {
            //if the user is an athlete, check if they're already registered in that category
            await connection
              .query(queries.select_all_from_category_assignment, [el])
              .then(async ([rows]) => {
                if (rows.length > 0) {
                  //athlete already registered in that category
                  rows.forEach(async elem => {
                    if (elem.username_trainer !== null) {
                      //if the athlete has a trainer assigned to that category, insert them into the category with their trainer
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
            //if the user is a trainer, simply add them to the category
            await connection.query(queries.insertInto_category_assignment, [
              username,
              el,
            ]);
          }
        });
      });
    })

    //return success response to client
    res.json({ status: 201 }).end();

  } catch (error) {
    //return error response to client and log error to console
    res.json({ status: 400 }).end();
    console.log(error);
  }
});



module.exports = router;
