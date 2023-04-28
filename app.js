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
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser("Murubutu"));
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:5173"],
    credentials: true,
  })
);

console.log(`working environments : ${process.env.NODE_ENV}`)

//test
app.get("/", (req, res) => res.sendStatus(203));

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

app.use("/api/v1/changePassword", controller.changePassword, changePassword);


 

module.exports = app;
