const queries = require("../model/queries.js");
const express = require("express");
const connection = require("../src/connectMysql.js");
const router = express.Router();



const d = new Date();

const seven_days_forward = new Date(d + 7 * 24 * 60 * 60 * 1000);

let year = d.getFullYear();

//entering hours worked by the trainer
router.post("/calendary/:username", async (req, res) => {
  try {
    // const username = req.params.username;
    //When a trainer enters the hours worked for a category, the following operations are these:
    //1) data entry in DB with reference category,
    //2)selection of all the hours done in that month by the specific teacher,
    //3)the total teaching hours are recorded in the account table.
    const username_trainer = req.params.username;
    const { id_course, number_of_training } = req.body;
console.log(d)
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      //controll-id and date-
      await connection
        .query(queries.select_code_registration_calendary, [1 , d.getUTCDate()])
        .then(async ([rows]) => {
          if (rows.length >= 0) {
            r = { Adele: "true", Tino: "false" };
console.log(rows)
            for (const username_ath in r) {
              await connection.query(queries.use);

              await connection.query(queries.insertIntoCalendary, [
                1,
                username_ath,
                d,
                d.getMonth() + 1,
                d.getFullYear(),
                seven_days_forward,
                "Akido",
                5,
                r[username_ath],
              ]);
           

            }

            await connection.query(queries.insertIntoHours, [
              1,
              username_trainer,
              d.getFullYear(),    
              d.getMonth() + 1,
              5,
            ]);

            //takes all hours of the specific month and year

            req.method = this.get;

            await connection
              .query(queries.selectUnitTime, [
                1,
                d.getFullYear(),
                d.getMonth() + 1,
              ])

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

router.get("/calendary/list_monthly_hours/:username", async (req, res) => {
  try {
    const username = req.params.username;
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection
        .query(queries.select_monthly_hours_mounth, [username])
        .then(async ([rows]) => {
          if (rows) res.json({ status: 201, success: true }).end();
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

//view a **monthly report "trainer : hours/monthly"

router.get("/calendary/list_monthly_hours_all", async (req, res) => {
  try {
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection
        .query(queries.select_monthly_hours_mounth_all)
        .then(async ([rows]) => {
          if (rows) {
            let tot_hours = 0;
            for (let number of rows) {
              tot_hours += number.hours_minutes_of_training_current_month;
            }

            res.json({ status: 201, data: tot_hours }).end();
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

//view a **monthly report "trainer : hours/monthly"-specif mounth-
router.get("/calendary/list_monthly_hours/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const { year, mounth } = req.body;
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection
        .query(queries.select_monthly_hours_for_specific_mounth, [
          username,
          year,
          mounth,
        ])
        .then(async ([rows]) => {
          if (rows) {
            let tot_hours = 0;
            for (let number of rows) {
              tot_hours += number.number_of_training;
            }

            res.json({ status: 201, data: tot_hours }).end();
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
