require("dotenv").config();


const queries = require("../model/queries.js");
const connection = require("../src/connectMysql.js");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();





router.put("/", async (req, res) => {
  const { newPassword } = req.body;
    let hashedPassowrd = await bcrypt.hash(newPassword, 12);

    connection()
      .then(async (connection) => {
        await connection.query(queries.use);
        connection
          .query(queries.updatePassword, [hashedPassowrd, req.username])
          .then((rows) => {
            console.log(rows)
            if(rows[0].affectedRows === 1) res.json({ status: 201});
          });
      })
      .catch((error) => {
        res.json({ status: 500})
        throw error;
      });
  
});


module.exports = router;
