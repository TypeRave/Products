require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT =  process.env.PORT;
const app = express();
const routes = require("./server/routes.js");

app.use(express.json());

app.use('/data', routes);




app.listen(PORT);
console.log(`Listening at http://localhost:${PORT}`);