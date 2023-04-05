const queries = require("../model/queries.js");
const connection = require("../src/connectMysql.js");
const jwt = require("jsonwebtoken");

//if the user exists in the db with params -params is a method of req-
exports.checkUserWithParams = (req, res, next) => {
  if (req.method == "DELETE") return next();

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
  if (req.method == "DELETE") return next();
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
  if (req.method == "DELETE") return next();
  let {
    username,
    password,
    confirmPassword,
    newUsername,
    name,
    surname,
    email,
    role,
    category,
  } = req.body;

  const roles = ["admin", "trainer", "athlete"];
  if (req.path != "/") {
    req.body.name = capFirstLetter(name);
    req.body.usurname = capFirstLetter(surname);
    req.body.email = email.toLowerCase();
    req.body.newUsername = capFirstLetter(newUsername);

    if (
      /^[A-Za-z0-9]*$/.test(username) &&
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
    req.body.category = category;

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
  return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}

exports.sevenDays = (date) => {
  const seven_days_forward = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  if (date.getTime() < seven_days_forward.getTime()) {
    res.json({ status: 400 }).end();

    console.log("After 7 days it is not possible to make changes!!");
  } else {
  }
};
exports.onlySession = (req, res, next) => {
  // console.log(req.session,'casa')

  if (req.session.loggedin === true) next();
  else {
    console.log("ciao");
    return res.json({ status: 401 }).end();
  }
};
exports.authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.JWT);
    req.username = data.username;
    req.userRole = data.role;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};
