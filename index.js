const express = require("express");
const app = express();
const cors = require('cors');
const db = require("./src/connectMysql.js");
const logIn = require("./routing/logIn.js");
const routing = express.Router();
const session = require("express-session");
const queries = require("./model/queries.js");
require("dotenv").config();
app.use(cors({
  origin: '*'
}));
//-----------------------------------------------------------------------------------------------------
//session is like cookie
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());

//-----------------------------------------------------------------------------------------------------
//create tables in the db if these are not there
db().then(async (connection) => {
   console.log("connection to db completed!!");
  await connection.query(queries.createDb);
  await connection.query(queries.use);
  await connection.query(queries.createAccounts);
  await connection.query(queries.createAdmin, [
    process.env.NAME,
    process.env.PASSWORD_ADMIN,
    process.env.NAME_SURNAME,
    process.env.EMAIL,
    process.env.ROLE
  ]);  

  return connection; 
});
//-----------------------------------------------------------------------------------------------------

// http://localhost:3000/home
//API
app.get("./dist", (req, res) => {
  // If the user is loggedin
  if (req.session.loggedin) {
    // Output username
    res.status(201).send("Welcome back, " + req.session.username + "!");
  } else {
    // Not logged in
    res.send("Please login to view this page!");
  }
  res.end();
});

app.use("/api/v1", logIn);

//-----------------------------------------------------------------------------------------------------

const port = process.env.PORT;

app.listen(port, (err) => {
  if (err) console.log("ERROR", err);
  console.log(`App running on port ${port}`);
});
