const queries = require("../model/queries.js");
const express = require("express");
const router = express.Router();
const connection = require("../src/connectMysql.js");
const bcrypt = require("bcryptjs");
const controller = require("../controller/auth.js");

//edit accounts
// router.patch("/:username", async (req, res) => {
//   try {
//     console.log(req.body)
//      const username = req.params.username;
//       await connection().then(async (connection) => {
//       await connection.query(queries.use);
//       await connection
//         .query(queries.edit_account, [req.body.email, req.body.newUsername, req.body.name, req.body.surname, username, req.body.category])
//         .then(async ([rows]) => {
//           if (rows) res.json({ status: 201, success: true  }).end()
//         else {
//           res.json({ status: 400, data: null }).end();
//         };
//         });
//     });
//   } catch (error) {
//     console.log(error)
//   }
// });

router.patch("/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const { newUsername, name, surname, email, category } = req.body;
    await connection().then(async (connection) => {
      await connection.query(queries.use);

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
          else {
            category.forEach(async (element) => {
              await connection
                .query(queries.select_id_course_from_category_assignment, [
                  newUsername,
                  element,
                ])
                .then(async ([rows]) => {
                  if (rows.length > 0) { const id = rows[0].id_course
                    await connection
                      .query(queries.edit_category_assignment, [
                        newUsername,
                        element,
                        id,
                      ])
                      .then(([rows]) => {
                        console.log(rows);
                                      res.json({ status: 201 }).end();

                      });
                  } 
                });
              // res.json({ status: 201 }).end();
            });
          }
        });
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
