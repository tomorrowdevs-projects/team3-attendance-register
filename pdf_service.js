const puppeteer = require('puppeteer');
const connection = require('./src/connectMysql')
const queries = require("./model/queries.js");
//https://www-bannerbear-com.translate.goog/blog/how-to-convert-html-into-pdf-with-node-js-and-puppeteer/?_x_tr_sl=en&_x_tr_tl=it&_x_tr_hl=it

function convertToTime(num) {
  var hours = Math.floor(num / 2);
  var minutes = (num % 2) * 30;
  return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
}

exports.buildPdp = async (url) => {
  const rowsDB = [];

  await connection().then(async (connection) => {
    await connection.query(queries.use);
    await connection
      .query(queries.innerjoin_account_hours)
      .then(async ([rows]) => {
        rowsDB.push(...rows)
      })
  })

 const browser = await puppeteer.launch();
console.log('rowsDB',rowsDB);
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const uniqueArray = [];
const seenObjects = {};

rowsDB.forEach((obj) => {
  const key = obj.name + "_" + obj.surname;
  if (!seenObjects[key]) {
    uniqueArray.push(obj);
    seenObjects[key] = true;
  }
});
const table = `<table>
<thead>
  <tr>
    <th>Trainers</th>
    <th>Total hours</th>
    <th>Month</th>
  </tr>
</thead>
<tbody>
${uniqueArray.reduce((string, el) => { string += '<tr><td>' + el.name +' '+ el.surname +'</td><td>' + convertToTime(el.hours_minutes_of_training_mounth) + '</td><td>' + months[el.mounth-1] + ' '+ el.year + '</td></tr>'; return string}, '')}
</tbody>
</table>`;

const styleFile = `th{ border: 1px solid black; font-size: 25px; padding: 10px; background-color: grey }
table{ width: 100%; border: 1px solid grey }
td{text-align: center; font-size: 18px; border: 1px solid gray; padding: 5px}`;

 const htmlFile = `<html> <head> <style> ${styleFile} </style> </head> <body> ${table} </body> </html>`;

 const page = await browser.newPage();

 await page.setContent(htmlFile, { waitUntil: 'domcontentloaded' });

 await page.emulateMediaType('screen');

// Downlaod the PDF
 const pdf = await page.pdf({
   path: './file/hours.pdf',
   margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
   printBackground: true,
   format: 'A4',
 });

 await browser.close();

  // doc.text(file, 100, 100).fontSize(30).end();
  console.log("Pdf created successfully!!");
};
