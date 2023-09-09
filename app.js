require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT =  process.env.PORT;
const routes = require("./server/routes.js");
const fs = require('fs');

const app = express();


const fp = path.join(__dirname, './stress_tests/loaderio-c1f22bca593b80cc4d0edea40117f151.txt')


app.use(express.json());

app.use('/loaderio-c1f22bca593b80cc4d0edea40117f151', (req, res) =>{

  let body = fs.readFileSync(fp);
  res.send(body);

})
app.use('/', routes);



app.listen(3001);
console.log('listening at port 3001')
app.listen(PORT);
console.log(`Listening at http://localhost:${PORT}`);