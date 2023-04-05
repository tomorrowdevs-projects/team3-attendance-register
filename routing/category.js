const queries = require("../model/queries.js");
const express = require("express");
const connection = require("../src/connectMysql.js");
const router = express.Router();
const aut = require("../controller/auth.js");

//let's create a new course
router.post("/category", async (req, res) => {
  try {
    const category = req.body.category;
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection

        .query(queries.insertInto_category_assignment_no_username, [category])
        .then(async ([rows]) => {
          if (rows.affectedRows === 1) res.json({ status: 201 }).end();
          //already present
          else if (rows.affectedRows === 0) res.json({ status: 404 }).end();
          else {
            res.json({ status: 400 }).end();
          }
        });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 401, data: null }).end();
  }
});



//category
router.get("/categoryAll/list", async (req, res) => {
  try {
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection

        .query(queries.select_category_list_from_category_assignment)
        .then(async ([rows]) => {
          if (rows.length > 0) {
            res
              .json({
                status: 201,
                data: rows,
              })
              .end();
          } else {
            res.json({ status: 400 }).end();
          }
        });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 401 }).end();
  }
});

//trainer see all its categories in category_assignment
router.get("/categoryMyList/:username", async (req, res) => {
  const username = req.params.username;
  try {
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection

        .query(queries.select_my_category_assignment, [username])
        .then(async ([rows]) => {
          if (rows.length > 0) {
            res.json({ status: 201, data: rows }).end();
          } else {
            res.json({ status: 400 }).end();
          }
        });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 401 }).end();
  }
});



//attendance_absences
router.patch(
  "/category/attendance_absences/:code_registration",
  async (req, res) => {
    try {
      const code_registration = req.params.code_registration;
      const boolean = req.body.boolean;
      const date = new Date();

      await connection().then(async (connection) => {
        await connection.query(queries.use);
        await connection
          .query(queries.check_data_category, [code_registration])
          .then(async ([rows]) => {
            // if it already exists
            if (date != null) res.json({ status: 404 }).end();
          });
        await connection

          .query(queries.attendance_absences, [
            boolean,
            date,
            code_registration,
          ])
          .then(async ([rows]) => {
            if (rows.affectedRows === 1) {
              res.json({ status: 201 }).end();
            } else {
              res.json({ status: 400 }).end();
            }
          });
      });
    } catch (error) {
      console.log(error);
      res.json({ status: 401 }).end();
    }
  }
);


//delete
router.delete("/category/del_category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection.query(queries.delete_category, [category]);
      res.json({ status: 201 }).end();
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 401 }).end();
  }
});

//categories_of_trainers
router.get("/categories_of_trainers", async (req, res) => {
  try {
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection

        .query(queries.categories_of_trainers)
        .then(async ([rows]) => {
          if (rows.length > 0) {
            const result = Object.values(
              rows.reduce((acc, el) => {
                if (!acc[el.username]) {
                  acc[el.username] = {
                    email: el.email,
                    name: el.name,
                    username: el.username,
                    surname: el.surname,
                    category: [el.category],
                    role: el.role,
                    hours_minutes_of_training_mounth:
                      el.hours_minutes_of_training_mounth,
                  };
                } else acc[el.username].category.push(el.category);
                return acc;
              }, {})
            );
            res.json({ status: 201, data: result }).end();
          } else {
            res.json({ status: 400 }).end();
          }
        });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 401 }).end();
  }
});

//athletes enrolled in what
router.get("/categories_of_athlete", async (req, res) => {
  try {
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection

        .query(queries.categories_of_athlese)
        .then(async ([rows]) => {
          if (rows.length > 0) {
            const result = Object.values(
              rows.reduce((acc, el) => {
                if (!acc[el.username]) {
                  acc[el.username] = {
                    email: el.email,
                    name: el.name,
                    username: el.username,
                    surname: el.surname,
                    category: [el.category],
                    role: el.role,
                  };
                } else acc[el.username].category.push(el.category);
                return acc;
              }, {})
            );

            res.json({ status: 201, data: result }).end();
          } else {
            res.json({ status: 400 }).end();
          }
        });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 401 }).end();
  }
});

//category_and_accounts_join
router.get("/category_and_accounts/:username", async (req, res) => {
  const username = req.params.username;

  try {
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection

        .query(queries.select_athlete_from_category_with_usernam_trainer, [
          username,
        ])
        .then(async ([rows]) => {
          if (rows.length > 0) {
            rows.forEach(async (el, index) => {
              let username_athlete = el.username_athlete;
              await connection
                .query(queries.date_ath, [username_athlete])
                .then(async ([rows2]) => {
                  rows[index].name = rows2[0].name;
                  rows[index].surname = rows2[0].surname;
                  if (rows.length - 1 === index)
                    res
                      .json({
                        status: 201,
                        data: rows,
                      })
                      .end();
                  console.log("rows", rows);
                });
            });
          } else {
            res.json({ status: 4007 }).end();
          }
        });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 401 }).end();
  }
});

module.exports = router;
