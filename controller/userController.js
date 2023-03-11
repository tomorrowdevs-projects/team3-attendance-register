const queries = require("../model/queries.js");
const express = require("express");
const connection = require("../src/connectMysql.js");

exports.checkusernameExist = (req, res, next) => {
  const { username, email } = req.body;
  connection().then(async (connection) => {
    await connection.query(queries.use);
    await connection
      .query(queries.selectUsername, [username, email])
      .then(async ([rows]) => {
        console.log(rows.length);
        if (rows.length > 0) return res.status(401).send();
        else {
          next();
        }
      });
  });
};
