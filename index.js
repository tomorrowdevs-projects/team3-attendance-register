//import { initializeApp } from "firebase/app";
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./src/connectMysql.js");
const logIn = require("./routing/logIn.js");
const changePassword = require('./routing/changePassword.js')
const logout = require("./routing/logout.js");
const category = require("./routing/category.js");
const cookieParser = require("cookie-parser");
const edit = require("./routing/editAndDelete.js");
const calendary = require("./routing/calendary.js");
const controller = require("./controller/auth.js");
const select = require("./routing/select.js");
const fillDb = require("./controller/toFillDb.js");
const managementMyApp = require("./routing/managementMyApp.js");
const download = require('./routing/download.js')
app.use(cookieParser("Murubutu"));
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH4uv4qKiy1ZKkaTT9qyoJAauf8Mdd9mA",
  authDomain: "team3project-19334.firebaseapp.com",
  projectId: "team3project-19334",
  storageBucket: "team3project-19334.appspot.com",
  messagingSenderId: "1051253835545",
  appId: "1:1051253835545:web:4def2a6de80d5299c2e788",
};
app.use(cookieParser());

// Initialize Firebase
//app.initializeApp(firebaseConfig);
//-----------------------------------------------------------------------------------------------------

app.use(express.json());

//-----------------------------------------------------------------------------------------------------
//create tables in the db if these are not there
db().then(async (connection) => {
  console.log("connection to db completed!!");
  fillDb(connection);
});
//-----------------------------------------------------------------------------------------------------



app.use("/api/v1", download);

app.use("/api/v1", logIn);
app.use("/api/v1", logout);
app.all("*", controller.authorization);
app.use("/api/v1", controller.changePassword, changePassword);


app.use(
  "/api/v1/managementMyApp/edit",
  controller.checkUserWithParams,
  controller.checkEmailForEdit,
  controller.checkParametersRegister,
  edit
);


app.use(
  "/api/v1/managementMyApp",
  controller.checkParametersRegister,
  controller.checkusernameExist,
  managementMyApp
);

app.use("/api/v1", select);
app.use("/api/v1", calendary);
app.use("/api/v1", category);

//-----------------------------------------------------------------------------------------------------

const port = process.env.PORT;

app.listen(port, (err) => {
  if (err) console.log("ERROR", err);
  console.log(`App running on port ${port}`);
});
