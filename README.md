# ASD - Attendance Register

## Project Description
  Software for the management of sports activities, trainers' and athletes' management.
  
  The application has two different roles: the administrator and the trainer.

  The administrator can perform CRUD actions for both trainers and athletes. He can assign both to individual sports categories.

  Finally, the app allows the administrator to generate a PDF file with the list of monthly hours for each trainer and a PDF REPORT of the total number of hours, for all   trainers.

  The coach, on the other hand, accesses the calendar of his own categories and displays the list of assigned athletes. He can check for the presence of the athletes. 

  The trainer can enter the number of hours/minutes of training, with increments of 30 minutes. He can make changes to the dates every 7 days.

   The app allows the trainer to generate a PDF file with the attendance list.

---
## Technologies used
* > MySql 
* > Node.js 
* > Javascript 
* > Vue
* > Docker
* > Jest
---

## Launch
How to run the project.
The program needs Node.js. If you don't already have it, go to https://nodejs.org/en/download/current/ and install it. 

Node.js is cross-platform and can be installed on MS Windows, Linux and MacOS.

Clone the repo: click on the green "Code" button and "Download zip"

Extract the contents in the desired folder, open the terminal and position on the same folder.

Install the dependencies by running the `npm install` command.

To make the app functional you need to install Xampp available at this address: https://www.apachefriends.org/download.html

Once installed xampp run the start of "Apache web server" and "MySql database".

NPM is the recommended installation method when building applications with Vue. 
After starting the server, open the shell and type: `npm start`.


Open another shell and type this command: `npm run dev`.
Now, the program is ready to run. 

The app is available at http://localhost:5173

By default, an admin user and a trainer user are created in the database, to access use the following credentials:

`Admin: Noelio , password: 123456qW`

`Trainer: Paskal , password: 123456hJ`