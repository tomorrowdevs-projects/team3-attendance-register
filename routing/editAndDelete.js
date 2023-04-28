const queries = require("../model/queries.js");
const express = require("express");
const router = express.Router();
const connection = require("../src/connectMysql.js");
const bcrypt = require("bcryptjs");
const controller = require("../controller/auth.js");

//edit accounts

router.put("/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const { newUsername, name, surname, email, category, old_category, role } =
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

          if (req.body.role === "trainer") {
            category.forEach(async (element) => {
              await connection
                .query(queries.select_id_course_from_category_assignment, [
                  newUsername,
                  element,
                ])
                //delete old_categories
                .then(async ([rows]) => {
                  if (rows.length === 0) {
                    await connection.query(
                      queries.insertInto_category_assignment,
                      [newUsername, element]
                    );
                  }
                });
            });

            old_category.forEach(async (el) => {
              if (!category.includes(el)) {
                await connection
                  .query(queries.select_id_course_from_category_assignment, [
                    newUsername,
                    el,
                  ])
                  //delete old_categories
                  .then(async ([rows]) => {
                    let id = rows[0].id_course;
                    await connection.query(
                      queries.delete_category_assignment_ID,
                      [id]
                    );
                  });
              }
            });
          }

          if (req.body.role === "athlete") {
            category.forEach(async (el) => {
              await connection
                .query(queries.select_all_from_category_assignment, [el])
                .then(async ([rows]) => {
                  if (rows.length > 0) {
                    //category not yet assigned to any trainer
                    rows.forEach(async (row) => {
                      if (row.username_trainer) {
                        await connection
                          .query(queries.select_athlete_from_category, [row.username_trainer, el, newUsername])
                          .then(async ([rows]) => {
                            if (rows.length === 0) {
                              let username_trainer = row.username_trainer;
                              let id = row.id_course;

                              await connection.query(
                                queries.insert_new_athleteToCategory,
                                [username_trainer, el, id, newUsername]
                              );
                            }
                          });

                      }
                    });
                  }
                });
            });
            if (old_category) {
              old_category.forEach(async (element) => {
                if (!category.includes(element)) {
                  await connection.query(queries.delete_category_athlete, [
                    element,
                    newUsername,
                  ]);
                }
              });
            }
          }
        });

      res.json({ status: 201 }).end();
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 40444 }).end();
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
