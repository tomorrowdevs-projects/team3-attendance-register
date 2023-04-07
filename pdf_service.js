const puppeteer = require('puppeteer');

exports.buildPdp = async (url) => {
//https://www-bannerbear-com.translate.goog/blog/how-to-convert-html-into-pdf-with-node-js-and-puppeteer/?_x_tr_sl=en&_x_tr_tl=it&_x_tr_hl=it

 const browser = await puppeteer.launch();

 const page = await browser.newPage();

 const website_url =    url// 'https://www.bannerbear.com/blog/how-to-download-images-from-a-website-using-puppeteer/'; 

 await page.goto(website_url, { waitUntil: 'networkidle0' }); 

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
