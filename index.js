const app = require('./app')
const port = process.env.PORT;
//_______________________________________________
app.listen(port, (err) => {
  if (err) console.log("ERROR", err);
  console.log(`App running on port ${port}`);
  
});


