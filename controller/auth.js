const queries = require("../model/queries.js");
const connection = require("../src/connectMysql.js");

//if the user exists in the db with params -params is a method of req-
exports.checkUserWithParams = (req, res, next) => {
  const username = req.path.substring(1);
  connection().then(async (connection) => {
    await connection.query(queries.use);
    await connection
      .query(queries.selectUser, [username])
      .then(async ([rows]) => {
        if (rows.length === 1) next();
        else {
          return res.status(401).json({ status: 401 });
        }
      });
  });
};

//if  the user or email exists in the db it cannot be stored
exports.checkusernameExist = (req, res, next) => {
  const { username, email } = req.body;
  if (req.path != "/") {
    const username = req.params.username;
    console.log(username);
  }
  connection().then(async (connection) => {
    await connection.query(queries.use);
    await connection
      .query(queries.selectUsernameOrEmail, [username, email])
      .then(async ([rows]) => {
        console.log(username);
        if (rows.length > 0) return res.status(401).json({ status: 401 });
        else {
          next();
        }
      });
  });
};

exports.checkEmailForEdit = async (req, res, next) => {
  const { email, newUsername } = req.body;

  connection().then(async (connection) => {
    await connection.query(queries.use);

    await connection
      .query(queries.selectForEdit, [email, newUsername])
      .then(async ([rows]) => {
        console.log(rows);
        if (rows.length === 0) next();
        else {
          return res.status(401).json({ status: 401, code: rows });
        }
      });
  });
};

exports.checkParametersRegister = (req, res, next) => {
  let {
    username,
    password,
    passwordConfirm,
    newUsername,
    name,
    surname,
    email,
    role,
  } = req.body;
  const roles = ["admin", "trainer", "athlete"];
  if (req.path != "/") {
    req.name = name.toLowerCase();
    req.surname = surname.toLowerCase();
    req.email = email.toLowerCase();
    req.newUsername = newUsername.toLowerCase();

    if (
      /^[-Za-z0-9]*$/.test(username) &&
      /^[a-zA-Z\s]*$/.test(name) &&
      /^[a-zA-Z\s]*$/.test(surname) &&
      /^[a-zA-Z\s]*$/.test(newUsername) &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      next();
    } else {
      return res.status(401).json({ status: 401 });
    }
  } else {
    req.name = name.toLowerCase();
    req.surname = surname.toLowerCase();
    req.username = username.toLowerCase();
    req.email = email.toLowerCase();
    req.role = role.toLowerCase();
    req.password = password;
    if (
      /^[-Za-z0-9]*$/.test(username) &&
      // /^(?=.[a-z])(?=.[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password) &&
      password === passwordConfirm &&
      /^[a-zA-Z\s]*$/.test(name) &&
      /^[a-zA-Z\s]*$/.test(surname) &&
      /^[a-zA-Z\s]*$/.test(newUsername) &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      roles.includes(role)
    )
      next();
    else {
      return res.status(401).json({ status: 401 });
    }
  }
};

exports.onlyAdmin = (req, res, next) => {
  if (req.session.role === "admin") next();
  else {
    return res.status(401).json({ status: 401 });
  }
};
