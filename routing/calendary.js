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
      await connection
        .query(queries.insertIntoCalendary, [
          username,
          current_month,
          year,
          seven_days_forward,
          "judo",
          number_of_training,
        ])
        await connection
        .query(queries.selectUnitTime, [username, year, current_month])

        .then(async ([rows]) => {
          let tot_hours = 0;
          for (let number of rows) { 
            tot_hours += number.number_of_training;
          }
          req.method = this.patch;
          await connection.query(queries.updatehours_minutes_of_training, [
            tot_hours,
            username,
          ]);

          res.json({ status: 201, success: true }).end();
        });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 401, data: null }).end();
  }
});

module.exports = router;
