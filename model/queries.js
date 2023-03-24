const createDb = `CREATE DATABASE IF NOT EXISTS team3`;
const selectLogin =
  "SELECT * FROM accounts WHERE username = ? AND password = ?";
const use = "USE team3";
const selectTrainerorAtlete = `SELECT * FROM accounts WHERE role = 'trainer' OR role = 'athlete' `;

const calendary = `CREATE TABLE if not exists calendary(
   username VARCHAR(255) NOT NULL ,
   current_month VARCHAR(15) NOT NULL ,
   year INT NOT NULL,
   other_date DATE NOT NULL ,
   name_category VARCHAR(255),
   number_of_training INT NULL DEFAULT 0,
   FOREIGN KEY(username) REFERENCES accounts(username)
  )`;

const selectUnitTime =
  "SELECT number_of_training  FROM calendary WHERE username  = ? AND year = ? AND current_month = ? ";
const insertIntoCalendary = `INSERT IGNORE INTO calendary (username, current_month, year, other_date, name_category, number_of_training) VALUES (?, ?, ?, ?,?, ?) `;

const updatehours_minutes_of_training = ` UPDATE IGNORE  accounts SET hours_minutes_of_training_current_month = ? WHERE username = ? `;

const createCategory = `CREATE TABLE if not exists category(
  username_trainer VARCHAR(255) NOT NULL ,
  name_category VARCHAR(255) NOT NULL,
  id_course int NOT NULL ,
  username_athlete VARCHAR(255)  NULL, 
  date DATE  NULL,
  attendance_absences VARCHAR(255)  NULL,
  code_registration int NOT NULL AUTO_INCREMENT unique  COMMENT "refers to course registration",
  FOREIGN KEY(username_trainer) REFERENCES accounts(username),
  FOREIGN KEY(username_athlete) REFERENCES accounts(username),
  FOREIGN KEY(id_course) REFERENCES category_assignment(id_course)

  ON UPDATE CASCADE ON DELETE RESTRICT
    
) `;

const category_assignment = `CREATE TABLE if not exists category_assignment(
  id_course int NOT NULL AUTO_INCREMENT ,
  username_trainer VARCHAR(255) NOT NULL , 
  name_category VARCHAR(255) NOT NULL unique,
  FOREIGN KEY(username_trainer) REFERENCES accounts(username),

  PRIMARY KEY (id_course)
 
 
 
 )`;

const select_athlete_category = `SELECT id_course FROM category WHERE name_category = ? AND username_athlete = ?`;
const select_category_from_category_assignment = `SELECT id_course, username_trainer FROM category_assignment WHERE name_category = ?   `;
const insert_new_athleteToCategory = `INSERT IGNORE INTO category (username_trainer, name_category, id_course, username_athlete) VALUES (?, ?,?,?)`;

const select_list_from_category = `SELECT * FROM category WHERE name_category = ? AND username_athlete = ? `;
const insertInto_category_assignment = `INSERT IGNORE INTO category_assignment (username_trainer, name_category) VALUES (?, ?)`;
const change_trainer = ` UPDATE IGNORE  category  SET username_trainer = ? WHERE name_category = ?`;
const attendance_absences = ` UPDATE IGNORE  category  SET attendance_absences = ?, date = ? WHERE code_registration = ? `;
const delete_category = `DELETE FROM category WHERE  name_category = ?`;
const select_username_athlete_from_attendance_absences = `SELECT username_athlete, code_registration FROM category WHERE name_category = ?  `;


const select_category = `SELECT * FROM category WHERE name_category = ?`;

const createAccounts = `CREATE TABLE  if not exists accounts( 
  username VARCHAR(255) NOT NULL,  
  password VARCHAR(255) NOT NULL,  
  name VARCHAR(255) NOT NULL, 
  surname VARCHAR(255) NOT NULL,  
  email VARCHAR(255) NOT NULL, 
  role VARCHAR(255) NOT NULL, 
  hours_minutes_of_training_current_month INT NULL DEFAULT 0  COMMENT 'each unit equals 30 minutes',
  PRIMARY KEY (username),
  KEY unique_index  (email)
 
    
   
  )`;
const passwordAndRole = `SELECT password ,role FROM accounts WHERE username = ?  `;
const selectUser = "SELECT * FROM accounts WHERE username = ?";
const createUser = `INSERT IGNORE INTO accounts (username, password, name, surname, email, role) VALUES (?, ?, ?, ?, ?, ?) `;
const selectUsernameOrEmail = `SELECT username OR email  FROM accounts WHERE  username = ? OR email = ? `;
const edit_account = ` UPDATE IGNORE  accounts SET email = ?, username = ? ,name = ?, surname = ? WHERE username = ? `;
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
  edit_account,
  deletAccounts,
  selectForEdit,
  selectUser,
  selectTrainerorAtlete,
  calendary,
  insertIntoCalendary,
  selectUnitTime,
  updatehours_minutes_of_training,
  createCategory,
  insertInto_category_assignment,
  insert_new_athleteToCategory,
  change_trainer,
  attendance_absences,
  delete_category,
  select_category,
  category_assignment,
  select_list_from_category,
  select_category_from_category_assignment,
  select_athlete_category,
  select_username_athlete_from_attendance_absences
};
