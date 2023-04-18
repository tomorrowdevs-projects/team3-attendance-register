require("dotenv").config();


const queries = require("../model/queries.js");
const connection = require("../src/connectMysql.js");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();





router.put("/changePassword", async (req, res) => {
  const { password, newPassword, confirmPassword } = req.body;
    let hashedPassowrd = await bcrypt.hash(newPassword, 12);
    console.log(hashedPassowrd)
    connection()
      .then(async (connection) => {
        await connection.query(queries.use);
        connection
          .query(queries.updatePassword, [hashedPassowrd, req.username])
          .then(([rows]) => {
            res.json({ status: 201});
          });
      })
      .catch((error) => {
        throw error;
      });
  
});


module.exports = router;
