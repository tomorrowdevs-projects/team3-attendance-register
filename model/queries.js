const createDb = `CREATE DATABASE IF NOT EXISTS team3`;
const insertAccount =
  "INSERT IGNORE INTO accounts(username, password, role) VALUES (?, ?, ?)";
const select = "SELECT * FROM accounts";
const use = "USE team3";
const createAccounts = `CREATE TABLE  if not exists accounts(
  id int(255) NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
    nome_cognome VARCHAR(255) NOT NULL,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  )`;

module.exports = { insertAccount, select, createAccounts, createDb, use };
