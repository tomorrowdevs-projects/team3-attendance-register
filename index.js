const express = require("express");
const app = express();
const db = require("./connectMysql.js");
const logIn = require("./routing/logIn.js");
const routing = express.Router();
const session = require("express-session");
const queries = require("./model/queries.js");
require('dotenv').config()

//-----------------------------------------------------------------------------------------------------
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());

//-----------------------------------------------------------------------------------------------------

db().then(async (connection) => {
  console.log("connection to db completed!!");
  await connection.query(queries.createDb);
  await connection.query(queries.use);
  await connection.query(queries.createAccounts);

  return connection;
});
//-----------------------------------------------------------------------------------------------------

// http://localhost:3000/home
app.get("/home", (req, res) => {
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

const port = process.env.PORT ;

app.listen(port, (err) => {
  if (err) console.log("ERROR", err);
  console.log(`App running on port ${port}`);
});
