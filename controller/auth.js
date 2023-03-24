const queries = require("../model/queries.js");
const connection = require("../src/connectMysql.js");

//if the user exists in the db with params -params is a method of req-
exports.checkUserWithParams = (req, res, next) => {
  if (req.method == 'DELETE') return next();

  const username = req.path.substring(1);
  connection().then(async (connection) => {
    await connection.query(queries.use);
    await connection
      .query(queries.selectUser, [username])
      .then(async ([rows]) => {
        if (rows.length === 1) next();
        else {
          return res.json({ status: 4011 });
        }
      });
  }); 
};

//if  the user or email exists in the db it cannot be stored
exports.checkusernameExist = (req, res, next) => {
  const { username, email } = req.body;
  if (req.path != "/") {
    const username = req.params.username;
  }
  connection().then(async (connection) => {
    await connection.query(queries.use);
    await connection
      .query(queries.selectUsernameOrEmail, [username, email])
      .then(async ([rows]) => {
        if (rows.length > 0) return res.json({ status: 402 });
        else {
          next();
        }
      });
  });
}; 

exports.checkEmailForEdit = async (req, res, next) => {
  if (req.method == 'DELETE') return next();
  const { email, newUsername } = req.body;

  connection().then(async (connection) => {
    await connection.query(queries.use);

    await connection
      .query(queries.selectForEdit, [email, newUsername])
      .then(async ([rows]) => {
        if (rows.length === 0) next();
        else {
          return res.json({ status: 403, code: rows });
        }
      });
  });
};

exports.checkParametersRegister = (req, res, next) => {

  if (req.method == 'DELETE') return next();
  let {
    username,
    password,
    confirmPassword,
    newUsername,
    name,
    surname,
    email,
    role,
  } = req.body;
  const roles = ["admin", "trainer", "athlete"];
console.log(req.body)
  if (req.path != "/") {
    
    req.body.name = capFirstLetter(name);
    req.body.surname = capFirstLetter(surname);
    req.body.email = email.toLowerCase();
    req.body.newUsername = capFirstLetter(newUsername);
    if (
      /^[-Za-z0-9]*$/.test(username) &&
      /^[a-zA-Z\s]*$/.test(name) &&
      /^[a-zA-Z\s]*$/.test(surname) &&
      /^[a-zA-Z\s]*$/.test(newUsername) &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      next();
    } else {
      return res.json({ status: 404 });
    }
  } else {
    
    req.body.name = capFirstLetter(name);
    req.body.surname = capFirstLetter(surname);
    req.body.username = capFirstLetter(username);
    req.body.email = email.toLowerCase();
    req.body.role = role.toLowerCase();
    req.body.password = password;
    if (
      /^[A-Za-z0-9]*$/.test(username) &&
      // /^(?=.[a-z])(?=.[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password) &&
      password === confirmPassword &&
      /^[a-zA-Z\s]*$/.test(name) &&
      /^[a-zA-Z\s]*$/.test(surname) &&
      /^[a-zA-Z\s]*$/.test(newUsername) &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      roles.includes(role)
    )
      next();
    else {
      return res.json({ status: 405 });
    }
  }
};

exports.onlyAdmin = (req, res, next) => {
  if (req.session.role === "admin") next();
  else {
    return res.json({ status: 401 });
  }
};

function capFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

