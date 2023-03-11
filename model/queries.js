const createDb = `CREATE DATABASE IF NOT EXISTS team3`;
const selectLogin =
  "SELECT * FROM accounts WHERE username = ? AND password = ?";
const use = "USE team3";
const createAccounts = `CREATE TABLE  if not exists accounts(
  id int(255) NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name_surname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL, 
   PRIMARY KEY (id),
   KEY unique_index  (username, email)
  
  )`;
const hash = `SELECT password FROM accounts WHERE username = ? `;

const createUser = `INSERT IGNORE INTO accounts (username, password, name_surname, email, role) VALUES (?, ?, ?, ?, ?) `;
const selectUsername = `SELECT username OR email  FROM accounts WHERE  username = ? OR email = ? `;

module.exports = {
  selectLogin,
  createAccounts,
  createDb,
  hash,
  use,
  createUser,
  selectUsername,
};
