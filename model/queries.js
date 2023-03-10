const createDb = `CREATE DATABASE IF NOT EXISTS team3`;
const insertAccount =
  "INSERT IGNORE INTO accounts(username, password, role) VALUES (?, ?, ?)";
const select = "SELECT * FROM accounts ";
const use = "USE team3";
const createAccounts = `CREATE TABLE  if not exists accounts(
  id int(255) NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name_surname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL, 
   PRIMARY KEY (id),
   CONSTRAINT UC_account UNIQUE (username, email)
  
  )`;

const createAdmin = `INSERT IGNORE INTO accounts (username, password, name_surname, email, role) VALUES (?, ?, ?, ?, ?) `;

module.exports = {
  insertAccount,
  select,
  createAccounts,
  createDb,
  use,
  createAdmin,
};
