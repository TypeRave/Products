require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT =  process.env.PORT;
const routes = require("./server/routes.js");
const fs = require('fs');

const app = express();
const compression = require('compression');

const fp = path.join(__dirname, './stress_tests/loaderio-a546c5dbb70fe40696825d613ca0516b.txt')


app.use(express.json());
app.use(compression())
app.use('/loaderio-a546c5dbb70fe40696825d613ca0516b', (req, res) =>{

  let body = fs.readFileSync(fp);
  res.send(body);

})
app.use('/', routes);




app.listen(PORT);
console.log(`Listening at http://localhost:${PORT}`);