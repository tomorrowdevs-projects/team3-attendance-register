const queries = require("../model/queries.js");
const express = require("express");
const connection = require("../src/connectMysql.js");
const router = express.Router();

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const d = new Date();
let current_month = month[d.getMonth()];
const data_now = new Date()
  .toISOString()
  .replace("-", "/")
  .split("T")[0]
  .replace("-", "/");
const timestamp = new Date().getTime() / 1000;
const seven_days_forward = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
const seven_days_forward_ligth = seven_days_forward
  .toISOString()
  .replace("-", "/")
  .split("T")[0]
  .replace("-", "/");
let year = d.getFullYear();

router.post("/calendary/:username", async (req, res) => {
  try {
    const username = req.params.username;
    let { number_of_training } = req.body;
    //When a teacher enters the hours worked for a category, the following operations are these:
    //1) data entry in DB with reference category,
    //2)selection of all the hours done in that month by the specific teacher,
    //3)the total teaching hours are recorded in the account table.

    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection.query(queries.insertIntoCalendary, [
        username,
        current_month,
        year,
        seven_days_forward,
        "judo",
        number_of_training,
      ]);

      //takes all hours of the specific month and year
      await connection
        .query(queries.selectUnitTime, [username, year, current_month])

        .then(async ([rows]) => {
          let tot_hours = 0;
          for (let number of rows) {
            tot_hours += number.number_of_training;
          }
          //updates the hours of the current month made on accounts

          req.method = this.patch;
          await connection.query(queries.updatehours_minutes_of_training, [
            tot_hours,
            username,
          ]);
          if (rows.affectedRows === 1)
            res.json({ status: 201, success: true }).end();
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

//view the monthly hours for each trainer

router.get("/calendary/list_monthly_hours/:username", async (req, res) => {
  try {
    const username = req.params.username;
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      await connection
        .query(queries.select_monthly_hours_mounth, [username])
        .then(async ([rows]) => {
          console.log(rows);
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
          console.log(rows);
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
