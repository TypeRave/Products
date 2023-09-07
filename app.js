require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT =  process.env.PORT;
const app = express();
const routes = require("./server/routes.js");
const fs = require('fs');

const fp = path.join(__dirname, './stress_tests/loaderio-a546c5dbb70fe40696825d613ca0516b.txt')


app.use(express.json());
app.use('/loaderio-a546c5dbb70fe40696825d613ca0516b', (req, res) =>{
  // console.log('attempting to open');
  let body = fs.readFileSync(fp);
  // console.log('file opened!');
  res.send(body);
})
app.use('/data', routes);




app.listen(PORT);
console.log(`Listening at http://localhost:${PORT}`);