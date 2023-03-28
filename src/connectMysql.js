require("dotenv").config();
const mysql = require("mysql2/promise");

async function db() {
  return await mysql.createConnection({
    host: process.env.LOCALHOST,
    user: process.env.ROOT,
    password: process.env.PASSWORD,
<<<<<<< HEAD
    port: process.env.PORT_DB
=======
    port: process.env.PORT_DB,
>>>>>>> 0862bdfb77f7b22202f4dcbbdd208269fd9f32e1
  });
}

module.exports = db;
