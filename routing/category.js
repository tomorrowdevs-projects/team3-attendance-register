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
          console.log(rows);
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

//insert_new_athleteToCategory

//to add an athlete in a category,
//first look for the category in the -category_assignment-
//then we check if the athlete is not already enrolled in the category
// and then insert the athlete in category
router.get("/category/insert/:username", async (req, res) => {
  try {
    const username_athlete = req.params.username;
    const category = req.body.name_category;

    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection
        //we request the id_course and username_trainer
        .query(queries.select_category_from_category_assignment, [category])
        .then(async ([rows]) => {
          const { id_course, username_trainer } = rows[0];
          // if(username_trainer == null) res.json({ status: 404 }).end()
          if (rows.length === 1) {
            await connection
              .query(queries.select_list_from_category, [
                category,
                username_athlete,
              ])

              .then(async ([rows]) => {
                console.log(rows);

                if (rows.length === 0) {
                  req.method = this.post;
                  await connection

                    .query(queries.insert_new_athleteToCategory, [
                      username_trainer,
                      category,
                      id_course,
                      username_athlete,
                    ])

                    .then(([rows]) => {
                      // console.log(rows)

                      if (rows.affectedRows === 1) {
                        res.json({ status: 201 }).end();
                      } else {
                        res.json({ status: 400 }).end();
                      }
                    });
                } else {
                  //user already registered in the course

                  res.json({ status: 400 }).end();
                }
              });
          } else {
            //category not yet created

            res.json({ status: 400 }).end();
          }
        });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 401 }).end();
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
            console.log(rows);

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

//trainer see all its categories
router.get("/categoryMyList/:username", async (req, res) => {
  const username = req.params.username;

  try {
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection

        .query(queries.select_my_category, [username])
        .then(async ([rows]) => {
          if (rows.length > 0) {
            console.log(rows);

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

//list of all the athletes enrolled in a category

router.get("/category/list", async (req, res) => {
  try {
    const category = req.body.name_category;
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection

        .query(queries.select_username_athlete_from_attendance_absences, [
          category,
        ])
        .then(async ([rows]) => {
          if (rows.length > 0) {
            res.json({ status: 201, data: rows }).end();
          } else {
            res.json({ status: 400, data: null }).end();
          }
        });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 401, data: null }).end();
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

//change trainer's name
router.patch(
  "/category/change_name_trainer/:username_trainer",
  async (req, res) => {
    try {
      const username_trainer = req.params.username_trainer;
      const name_category = req.body.name_category;
      await connection().then(async (connection) => {
        await connection.query(queries.use);
        await connection

          .query(queries.change_trainer, [username_trainer, name_category])
          .then(async ([rows]) => {
            if (rows.affectedRows === 1) res.json({ status: 201 }).end();
            else {
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
    console.log(category);
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
            rows.forEach((el) => el.values(object1));

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

//athletes enrolled in what
router.get("/categories_of_athlete", async (req, res) => {
  try {
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection

        .query(queries.categories_of_athlese)
        .then(async ([rows]) => {
          if (rows.length > 0) {
            console.log(rows);

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

module.exports = router;
