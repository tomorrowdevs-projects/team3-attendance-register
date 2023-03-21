const queries = require("../model/queries.js");
require("dotenv").config();
const bcrypt = require("bcryptjs");

async function toFillDb(connection) {
  try {
    await connection.query(queries.createDb);
    await connection.query(queries.use);
    await connection.query(queries.createAccounts);
    let hashedPassowrd = await bcrypt.hash(process.env.PASSWORD_ADMIN, 12);
    let hashedPassowrdTrainer = await bcrypt.hash(
      process.env.PASSWORD_TRAINER,
      12
    );
    let hashedPassowrdAt00 = await bcrypt.hash(process.env.PASSWORD_AT00, 12);
    let hashedPassowrdAt01 = await bcrypt.hash(process.env.PASSWORD_AT01, 12);
    let hashedPassowrdAt02 = await bcrypt.hash(process.env.PASSWORD_AT02, 12);

    await connection.query(queries.createUser, [
      process.env.USERNAME,
      hashedPassowrd,
      process.env.NAME,
      process.env.SURNAME,
      process.env.EMAIL, 
      process.env.ROLE
    ]);
    await connection.query(queries.createUser, [
      process.env.USERNAMETR,
      hashedPassowrdTrainer,
      process.env.NAMETR,
      process.env.SURNAMETR,
      process.env.EMAILTR, 
      process.env.ROLETR
    ]);
    await connection.query(queries.createUser, [
      process.env.USERNAME00,
      hashedPassowrdAt00,
      process.env.NAMET00,
      process.env.SURNAMETR00,
      process.env.EMAIL1T00,
      process.env.ROLEAT00
    ]);
    await connection.query(queries.createUser, [
      process.env.USERNAME01,
      hashedPassowrdAt01,
      process.env.NAMET01,
      process.env.SURNAMETR01,
      process.env.EMAIL1T01,
      process.env.ROLEAT01
    ]);
    await connection.query(queries.createUser, [
      process.env.USERNAME02,
      hashedPassowrdAt02,
      process.env.NAMET02,
      process.env.SURNAMETR02,
      process.env.EMAILAT02,  
      process.env.ROLEAT02
    ]);
  } catch (err) {console.log(err);}    
   
  }

 
module.exports = toFillDb;
