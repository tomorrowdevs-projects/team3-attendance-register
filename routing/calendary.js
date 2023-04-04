const queries = require("../model/queries.js");
const express = require("express");
const connection = require("../src/connectMysql.js");
const router = express.Router();

const d = new Date();

const mounth = d.getMonth() + 1;

const date_now = d.getFullYear() + "-" + mounth + "-" + d.getUTCDate();

const seven_days_forward = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

//entering hours worked by the trainer
router.post("/calendary/:username", async (req, res) => {
  try {
    //When a trainer enters the hours worked for a category, the following operations are these:
    //1) data entry in DB with reference category,
    //2)selection of all the hours done in that month by the specific teacher,
    //3)the total teaching hours are recorded in the account table.
    const username_trainer = req.params.username;
    const { id_course, number_of_training, category, nome_ath } = req.body;
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      //controll-id and date-
      await connection
        .query(queries.select_code_registration_calendary, [id_course, date_now])
        .then(async ([rows]) => {
          if (rows.length === 0) {
            console.log(seven_days_forward);
            for (const username_ath in nome_ath) {
              await connection.query(queries.use);

              await connection.query(queries.insertIntoCalendary, [
                username_trainer,
                1,
                username_ath,
                d,
                mounth,
                d.getFullYear(),
                seven_days_forward,
                category,
                number_of_training,
                nome_ath[username_ath],
              ]);
            }

            await connection.query(queries.insertIntoHours, [
              1,
              username_trainer,
              d.getFullYear(),
              mounth,
              number_of_training,
            ]);

            //takes all hours of the specific month and year

            req.method = this.get;

            await connection
              .query(queries.selectUnitTime, [id_course, d.getFullYear(), mounth])

              .then(async ([rows]) => {
                let tot_hours = 0;
                for (let number of rows) {
                  tot_hours += number.number_of_training;
                }

                //updates the hours of the current month made on accounts

                req.method = this.patch;
                await connection
                  .query(queries.updatehours_minutes_of_training, [
                    tot_hours,
                    username_trainer,
                  ])
                  .then(async ([rows]) => {
                    if (rows.affectedRows === 1)
                      res.json({ status: 201, success: true }).end();
                    else {
                      res.json({ status: 400 }).end();
                    }
                  });
              });
          } else {
            res.json({ status: 406 }).end();
          } //Already present in db
        });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 401 }).end();
  }
});

//view the monthly hours for each trainer

router.get("/calendary/list:username", async (req, res) => {
  try {
    const username = req.params.username;
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection
        .query(queries.select_all_from_calendary, [username])
        .then(async ([rows]) => {
          if (rows) res.json({ status: 201 }).end();
          else {
            res.json({ status: 400 }).end();
          }
        });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 401 }).end();
  }
});


//edit
router.patch("/calendary_edit", async (req, res) => {
  await connection().then(async (connection) => {
    await connection.query(queries.use);
    //controll-id and date-
    await connection
      .query(queries.select_code_registration_calendary, [id_course, date_now])
      .then(async ([rows]) => {
        if (rows.length === 0) {





        }
      });
  });
});

module.exports = router;
