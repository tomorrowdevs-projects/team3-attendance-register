require("dotenv").config();
const mysql = require("mysql2/promise");

async function db() {
  return await mysql.createConnection({
    host: 'localhost',//process.env.localhost,
    user: 'root',//process.env.root,
    password: ''//process.env.password,
  });
}

module.exports = db;
