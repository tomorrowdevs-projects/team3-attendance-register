const createDb = `CREATE DATABASE IF NOT EXISTS team3`;
const selectLogin = "SELECT * FROM accounts WHERE username = ? ";
const use = "USE team3";
const selectTrainerorAtlete = `SELECT * FROM accounts WHERE role = 'trainer' OR role = 'athlete' `;

const hours = `CREATE TABLE if not exists hours(
  id_course int NOT NULL,

  username_trainers VARCHAR(255) NOT NULL ,  
  mounth INT NOT  NULL ,
  year INT NOT  NULL,
  number_of_training INT NULL DEFAULT 0, 
  code_registration int NOT NULL AUTO_INCREMENT unique  COMMENT "refers to id registration",

  
  FOREIGN KEY(username_trainers) REFERENCES accounts(username)
  ON UPDATE CASCADE )`;

const updateIntoHours = `UPDATE IGNORE hours SET number_of_training = ? WHERE id_course = ? AND username_trainers = ? AND year = ? AND mounth = ? `;

const calendary = `CREATE TABLE if not exists calendary(
  username_trainer VARCHAR(255) NOT NULL ,  

  id_course int NOT NULL,
   username_athlete VARCHAR(255) NOT NULL ,  
   date DATE NOT  NULL, 
    mounth INT NOT  NULL , 
   year INT NOT  NULL,
   other_date DATE NOT NULL ,    
   category
    VARCHAR(255) NOT NULL, 
   number_of_training INT NULL DEFAULT 0, 
   absences_or_presences BOOLEAN NOT NULL, 
   code_registration int NOT NULL AUTO_INCREMENT unique  COMMENT "refers to course registration"
 
   
 
 
   
  )`;

const select_code_registration_calendary = `SELECT code_registration FROM calendary WHERE id_course = ? AND date =? `;
const selectUnitTime = `SELECT number_of_training  FROM hours WHERE id_course  = ? AND year = ? AND mounth = ? `;
const insertIntoCalendary = `INSERT IGNORE INTO calendary (username_trainer, id_course, username_athlete, date, mounth, year, other_date,category,  number_of_training, absences_or_presences) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?,?) `;
const edit_calendary = `UPDATE  IGNORE  calendary  SET number_of_training = ?, absences_or_presences = ?   WHERE id_course = ? AND username_athlete =  ?  `;

const updatehours_minutes_of_training = ` UPDATE IGNORE  accounts SET hours_minutes_of_training_mounth = ? WHERE username = ? `;

const select_all_from_calendary = ` SELECT * FROM  calendary WHERE username_trainer = ?`;
const createCategory = `CREATE TABLE if not exists category(
  username_trainer VARCHAR(255) NOT NULL ,
  category
   VARCHAR(255) NOT NULL, 
   id_course int NOT NULL,
  username_athlete VARCHAR(255) NULL, 
  code_registration int NOT NULL AUTO_INCREMENT unique  COMMENT "refers to course registration",
 
  FOREIGN KEY(username_athlete) REFERENCES accounts(username)   ON UPDATE CASCADE ON DELETE CASCADE,

  FOREIGN KEY(username_trainer) REFERENCES accounts(username) ON UPDATE CASCADE ON DELETE CASCADE
) `;

const select_number_of_training_old =` SELECT  number_of_training, mounth, year, username_trainer FROM calendary WHERE  id_course = ? AND 
date = ? `
const category_assignment = `CREATE TABLE if not exists category_assignment(
  id_course int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  username_trainer VARCHAR(255)  NULL ,  
  category
  VARCHAR(255) NOT NULL, 
   
  FOREIGN KEY(username_trainer) REFERENCES accounts(username) ON UPDATE CASCADE ON DELETE CASCADE
 
 
   
 )`;

const alter = `ALTER TABLE category ADD FOREIGN KEY (id_course) REFERENCES category_assignment(id_course) ON DELETE CASCADE ON UPDATE CASCADE`;

const select_athlete_from_category = `SELECT username_trainer, category, username_athlete FROM category WHERE username_trainer = ? AND category = ? AND username_athlete=? `;
const select_category_list_from_category_assignment = `SELECT category, username_trainer FROM category_assignment `;
const select_athlete_category = `SELECT id_course FROM category WHERE category
 = ? AND username_athlete = ?`;
const select_category_from_category_assignment = `SELECT id_course, username_trainer FROM category_assignment WHERE category
 = ?   `;
const select_all_from_category_assignment = `SELECT * FROM category_assignment WHERE category
 = ?   `;
const insert_new_athleteToCategory = `INSERT IGNORE INTO category (username_trainer, category
  , id_course, username_athlete) VALUES (?, ?,?,?)`;

const select_list_from_category = `SELECT * FROM category WHERE category
 = ? AND username_athlete = ? `;
const insertInto_category_assignment = `INSERT IGNORE INTO category_assignment (username_trainer, category
  ) VALUES (?, ?)`;

const insertInto_category_assignment_no_username = `INSERT IGNORE INTO category_assignment ( category
    ) VALUES ( ?)`;
const change_trainer = ` UPDATE IGNORE  category  SET username_trainer = ? WHERE category
 = ?`;
const attendance_absences = ` UPDATE IGNORE  category  SET attendance_absences = ?, date = ? WHERE code_registration = ? `;
const delete_category = `DELETE FROM category_assignment  WHERE  category = ?`;
const select_username_athlete_from_attendance_absences = `SELECT username_athlete, code_registration FROM category WHERE category
 = ?  `;
const select_from_hours = `SELECT  number_of_training FROM hours WHERE  mounth = ? AND id_course = ? AND year = ?`
const select_category = `SELECT * FROM category WHERE category
 = ?`;
const select_my_category_assignment = `SELECT category, id_course FROM category_assignment WHERE username_trainer = ?`;

const delete_category_athlete = `DELETE FROM category  WHERE  category = ? AND username_athlete = ?`;
const createAccounts = `CREATE TABLE  if not exists accounts( 
  username VARCHAR(255) NOT NULL,  
  password VARCHAR(255) NOT NULL,  
  name VARCHAR(255) NOT NULL, 
  surname VARCHAR(255) NOT NULL,  
  email VARCHAR(255) NOT NULL, 
  role VARCHAR(255) NOT NULL, 
  hours_minutes_of_training_mounth INT DEFAULT 0  COMMENT 'each unit equals 30 minutes',
  PRIMARY KEY (username),
  KEY unique_index  (email) 
  
         
  )`;
const select_trainer_from_category = `SELECT username_trainer FROM category_assignment WHERE category = ?`;

const select_id_course_from_category_assignment = `SELECT id_course, category FROM category_assignment WHERE  username_trainer = ? AND category = ?`;
const edit_category_assignment = ` UPDATE IGNORE  category_assignment SET username_trainer = ?, category = ?  WHERE id_course = ? `;
const edit_hours = ` UPDATE IGNORE  hours SET number_of_training = ? WHERE id_course = ? AND mounth = ? AND year = ?`;
const edit_hours_accounts = ` UPDATE IGNORE  accounts SET hours_minutes_of_training_mounth = ? WHERE username = ? `

const select_trainer_category = `SELECT username_trainer, category FROM category_assignment WHERE  username_trainer = ? AND category = ?`;
const passwordAndRole = `SELECT password ,role FROM accounts WHERE username = ?  `;
const selectUser = "SELECT * FROM accounts WHERE username = ?";
const createUser = `INSERT IGNORE INTO accounts (username, password, name, surname, email, role) VALUES (?, ?, ?, ?, ?, ?) `;
const selectUsernameOrEmail = `SELECT username OR email  FROM accounts WHERE  username = ? OR email = ? `;
const edit_account = ` UPDATE IGNORE  accounts SET email = ?, username = ? ,name = ?, surname = ? WHERE username = ? `;
const deletAccounts = `DELETE FROM accounts WHERE username = ?`;
const selectForEdit = `SELECT username , email FROM accounts WHERE username = ? OR   email = ?`;
const select_monthly_hours_mounth = ` SELECT hours_minutes_of_training_mounth FROM accounts WHERE  username = ?`;
const select_monthly_hours_mounth_all = ` SELECT hours_minutes_of_training_mounth FROM accounts `;
const select_monthly_hours_for_specific_mounth = ` SELECT number_of_training FROM calendary WHERE  username = ? AND year = ? AND mounth = ? `;
const select_hours_trainer = ` SELECT number_of_training FROM hours WHERE  username_trainers = ? AND year = ? AND mounth = ? `;

const check_data_category = ` SELECT date FROM category WHERE  code_registration = ? `;

const categories_of_trainers = ` SELECT username, name, surname, email, category, role, hours_minutes_of_training_mounth
FROM accounts FULL JOIN category_assignment ON username = username_trainer `;

const categories_of_athlese = `  SELECT username, name, surname, email, category, role  FROM  category FULL JOIN accounts ON username_athlete = username   `;

const delete_category_ID = `DELETE FROM category  WHERE  id_course = ?`;
const delete_category_assignment_ID = `DELETE FROM category_assignment  WHERE  id_course = ?`;

const select_athlete_from_category_with_usernam_trainer = `SELECT * FROM category WHERE username_trainer = ?  `;
const date_ath = `SELECT name, surname FROM accounts WHERE username = ?`;
const innerjoin_account_calendary = ` SELECT  * FROM accounts FULL JOIN calendary ON username = username_athlete`;
const innerjoin_account_hours = ` SELECT name, surname, hours_minutes_of_training_mounth, mounth, year, number_of_training, id_course FROM accounts FULL JOIN hours ON username = username_trainers`;
const insert_to_hours = ` INSERT IGNORE INTO hours (id_course, username_trainers, mounth, year, number_of_training) VALUES ( ?, ?, ?, ?, ? )`

module.exports = {
  selectLogin,
  alter,
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
  select_my_category_assignment,
  select_category_from_category_assignment,
  select_athlete_category,
  select_username_athlete_from_attendance_absences,
  insertInto_category_assignment_no_username,
  select_category_list_from_category_assignment,
  select_monthly_hours_mounth,
  select_monthly_hours_mounth_all,
  select_monthly_hours_for_specific_mounth,
  check_data_category,
  categories_of_trainers,
  categories_of_athlese,
  select_trainer_category,
  select_athlete_from_category,
  select_id_course_from_category_assignment,
  edit_category_assignment,
  delete_category_athlete,
  select_trainer_from_category,
  select_all_from_category_assignment,
  delete_category_ID,
  delete_category_assignment_ID,
  select_athlete_from_category_with_usernam_trainer,
  date_ath,
  select_code_registration_calendary,
  hours,
  updateIntoHours,
  select_all_from_calendary,
  edit_calendary,
  select_number_of_training_old,
  select_from_hours,
  edit_hours,
  edit_hours_accounts,
  innerjoin_account_calendary,
  select_hours_trainer,
  innerjoin_account_hours,
  insert_to_hours,
};
