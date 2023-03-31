const queries = require("../model/queries.js");
const express = require("express");
const router = express.Router();
const connection = require("../src/connectMysql.js");
const bcrypt = require("bcryptjs");
const controller = require("../controller/auth.js");

//edit accounts

router.put("/:username", async (req, res) => {
  try {
    req.session.role = "athlete"; 
    const username = req.params.username;

    const { newUsername, name, surname, email, category, old_category } =
      req.body;
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      //edit accounts
      await connection
        .query(queries.edit_account, [
          email,
          newUsername,
          name,
          surname,
          username,
        ])
        .then(async ([rows]) => {
          if (rows.affectedRows === 0) res.json({ status: 404 }).end();

          if (req.session.role === "trainer") {
            old_category.forEach(async (element) => {
              await connection
                .query(queries.select_id_course_from_category_assignment, [
                  newUsername,
                  element,
                ])
                //delete old_categories
                .then(async ([rows]) => {
                  console.log(rows);
                  if (rows.length > 0) {
                    let id = rows[0].id_course; 
                    await connection.query(
                      queries.delete_category_assignment_ID,
                      [id]
                    );  
                  }  
                  //add new categories
                  category.forEach(async (el) => {
                    await connection.query(
                      queries.insertInto_category_assignment,
                      [newUsername, el]
                    );
                  });
                });
            });  
          }

          if (req.session.role === "athlete") {
            old_category.forEach(async (element) => {
              await connection.query(queries.delete_category_athlete, [
                element,
                newUsername,
              ]);
            });
            category.forEach(async (el) => {
              await connection
                .query(queries.select_all_from_category_assignment, [el])
                .then(async ([rows]) => {
                  if (rows.length > 0) {
                    //category not yet assigned to any trainer
                    if (!rows[0].username_trainer) {
                      //when the category is not assigned to any traine the athlete cannot register!!
                      return; 
                    } else {
                      let username_trainer = rows[0].username_trainer;
                      let id = rows[0].id_course;

                      await connection.query(
                        queries.insert_new_athleteToCategory,
                        [username_trainer, el, id, newUsername]
                      );
                    }
                  }
                });
            });
          }
        });

      res.json({ status: 201 }).end();
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 404 }).end();
  }
});

router.delete("/del/:username", async (req, res) => {
  try {
    const username = req.params.username;
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection.query(queries.deletAccounts, [username]);
      res.json({ status: 201 }).end();
    });
  } catch (error) {
    res.json({ status: 401 }).end();
    console.log(error); 
  }
});

module.exports = router;
