const createDb = `CREATE DATABASE IF NOT EXISTS team3`;
const selectLogin =
  "SELECT * FROM accounts WHERE username = ? AND password = ?";
const use = "USE team3";
const selectTrainnerorAtlete = "SELECT username FROM accounts WHERE role  = ? ";
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const d = new Date();
let name = month[d.getMonth()]
const createAccounts = `CREATE TABLE  if not exists accounts(
  id int(255) NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL, 
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL, 
  email VARCHAR(255) NOT NULL, 
  role VARCHAR(255) NOT NULL,  
  hours_minutes_of_training INT NULL DEFAULT NULL  COMMENT 'each unit equals 30 minutes',
   PRIMARY KEY (id),
   KEY unique_index  (username, email)
  
  )`;
const passwordAndRole = `SELECT password ,role FROM accounts WHERE username = ?  `;
const selectUser =  "SELECT * FROM accounts WHERE username = ?";
const createUser = `INSERT IGNORE INTO accounts (username, password, name, surname, email, role) VALUES (?, ?, ?, ?, ?, ?) `;
const selectUsernameOrEmail = `SELECT username OR email  FROM accounts WHERE  username = ? OR email = ? `;
const edit_accounts = ` UPDATE IGNORE  accounts SET email = ?, username = ? ,name = ?, surname = ? WHERE username = ? `;
const deletAccounts = `DELETE FROM accounts WHERE username = ?`;
const selectForEdit = `SELECT username , email FROM accounts WHERE username = ? OR   email = ?`;




module.exports = {
  selectLogin,
  createAccounts,
  createDb,
  passwordAndRole,
  use,
  createUser,
  selectUsernameOrEmail,
  edit_accounts,
  deletAccounts,
  selectForEdit,
   selectUser,
   selectTrainnerorAtlete
};
