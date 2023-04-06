const queries = require("../model/queries.js");
const express = require("express");
const connection = require("../src/connectMysql.js");
const router = express.Router();

const d = new Date();

const mounth = d.getMonth() + 1;
const data = "";
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
    const { id_course, number_of_training, category, name_ath } = req.body;
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      //controll-id and date-
      await connection
        .query(queries.select_code_registration_calendary, [
          id_course,
          date_now,
        ])
        .then(async ([rows]) => {
          if (rows.length === 0) {
            for (const username_ath in name_ath) {
              await connection.query(queries.use);

              await connection.query(queries.insertIntoCalendary, [
                username_trainer,
                id_course,
                username_ath,
                d,
                mounth,
                d.getFullYear(),
                seven_days_forward,
                category,
                number_of_training,
                name_ath[username_ath],
              ]);
            }

            await connection.query(queries.insertIntoHours, [
              id_course,
              username_trainer,
              d.getFullYear(),
              mounth,
              number_of_training,
            ]);

            //takes all hours of the specific month and year

            req.method = this.get;

            await connection
              .query(queries.selectUnitTime, [
                id_course,
                d.getFullYear(),
                mounth,
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

//function to transform data for sending calendary/list
function transformData (rows) {
  const result = [];
  rows.forEach(obj => {
    const index = result.findIndex(elem => elem.id === obj.id_course);
    if (index === -1) {
      result.push({
        id: obj.id_course,
        username_trainer: obj.username_trainer,
        edit: new Date(date_now) > obj.other_date ? false : true,
        date: obj.date,
        category: obj.category,
        number_of_training: obj.number_of_training, 
        name_ath: { [obj.username_athlete]: [obj.absences_or_presences, obj.surname, obj.name] },
        mounth: obj.mounth,
        year: obj.year,
      });
    } else {
      result[index].name_ath[obj.username_athlete] = [obj.absences_or_presences, obj.surname, obj.name];
    }
  });

  return result
};

//view the monthly hours for each trainer

router.get("/calendary/list/:username", async (req, res) => {
  try {
    req.userRole = 'trainer';
    const username = req.params.username;
    await connection().then(async (connection) => {
      await connection.query(queries.use);
      if (req.userRole !== 'admin') {
        await connection
          .query(queries.innerjoin_account_calendary, [username])
          .then(async ([rows]) => {
            const result = transformData(rows);
            console.log(rows);
            if (rows) res.json({ status: 201, data: result }).end();
            else res.json({ status: 400 }).end();
          });

      } else {
        await connection
          .query(queries.select_admin_calendary)
          .then(async ([rows]) => {
            const result = transformData(rows);
            //console.log('admin',result[0].name_ath, rows);
            if (rows) res.json({ status: 201, data: result }).end();
            else res.json({ status: 400 }).end();
          })
      }
            //rows.forEach(row => new Date(date_now) > row.other_date ? row.edit = false : row.edit = true)
    });
  } catch (error) {
    console.log(error);
    res.json({ status: 401 }).end();
  }
});

//edit
router.patch("/calendary_edit", async (req, res) => {
  await connection()
    .then(async (connection) => {
      const { id_course, number_of_training, name_ath } = req.body;

      await connection.query(queries.use);
      await connection
        //find old number_of_training
        .query(queries.select_number_of_training_old, [id_course, "2023-4-4"])

        .then(async ([rows]) => {
          const old = rows[0].number_of_training;
          const mounth = rows[0].mounth;
          const year = rows[0].year;
          const username = rows[0].username_trainer;
          for (const username_ath in name_ath) {
            //write to calendary

            await connection.query(queries.edit_calendary, [
              old,
              name_ath[username_ath],
              id_course,
              username_ath,
            ]);
          }
          await connection

            .query(queries.select_from_hours, [mounth, id_course, year])
            .then(async ([rows]) => {
              const old_mouthly = rows[0].number_of_training;
              //fewer units of work were done
              if (old > number_of_training) {
                let number_of_training_new = old - number_of_training;
                let new_monthly = old_mouthly - number_of_training_new;

                //write to hours
                await connection.query(queries.edit_hours, [
                  new_monthly,
                  id_course,
                  mounth,
                  year,
                ]);
                await connection.query(queries.edit_hours_accounts, [
                  new_monthly,
                  username,
                ])


                //if they are equal -error 407-
              } else if (old === number_of_training) {
                res.json({ status: 407 }).end();
              } else {
                old < number_of_training;
                let number_of_training_new = number_of_training - old;
                let new_monthly = old_mouthly - number_of_training_new;
                //write to hours
                await connection.query(queries.edit_hours, [
                  new_monthly,
                  id_course,
                  mounth,
                  year,
                ]);
                await connection.query(queries.edit_hours_accounts, [
                  new_monthly,
                  username,
                ]);
              }
            });
        });

    })
    .then(() => {
      res.json({ status: 201 }).end();
    })
    .catch((error) => {
      console.error(error);
      res.json({ status: 402 }).end();
    });
});

module.exports = router;
