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
        if (rows.length > 0) return res.status(401).end();
        else {
          next();
        }
      });
  });
};

//usename = no space && onlynumbers and letters,
//password = 8 charachters
//name_surname only letters and space

exports.checkParametersRegister = ( req, res, next) => {
  let { username, password, passwordConfirm, name_surname, email, role } = req.body;
  const roles = ['admin', 'trainer', 'athlete'];
  name_surname = name_surname.replace(/\s+/g, " ");
  username = username.toLowerCase();

  email = email.toLowerCase();
  role = role.toLowerCase();
  if (
    /^[-Za-z0-9]*$/.test(username) &&
    // // /^(?=.[a-z])(?=.[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password) &&
    password === passwordConfirm &&
    /^[a-zA-Z\s]*$/.test(name_surname) &&
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
    roles.includes(role)
  )
    next();
  else {
    return res.status(401).end();
  }
};

exports.onlyAdmin = (req, res, next) => {
  if (req.session.role === 'admin') next();
  else {
    return res.status(401).end();
  }
};
