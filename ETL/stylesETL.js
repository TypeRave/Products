const {Client} = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const Promise = require('bluebird');


const client = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  port: process.env.PG_PORT,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
})
const filepath = path.join(__dirname,'../data/styles.csv' );

fs.access(filepath, (err, results) => {
  if(err) {
    console.log('file not found');
  } else {
    console.log('file found');
  }
})

client.connect();
client.query('CREATE TABLE IF NOT EXISTS styles (\
  id SERIAL PRIMARY KEY,\
  product_id INTEGER NOT NULL,\
  name VARCHAR(500),\
  sale_price INTEGER,\
  original_price INTEGER,\
  isDefault BOOLEAN,\
  FOREIGN KEY (product_id) REFERENCES overview(id))')
  .then(() => {
    console.log('styles table created');
  })
  // FOREIGN KEY (image_id) REFERENCES images(id),\
  // .then(() => {
  //   client.query('CREATE TABLE IF NOT EXISTS images (\
  //     id SERIAL PRIMARY KEY,\
  //     style_id INTEGER,\
  //     thumbnail_url VARCHAR(2083),\
  //     url VARCHAR(2083),\
  //     FOREIGN KEY (style_id) REFERENCES styles(id))')
  // })
  // .then(() => console.log('images table created'))
  // // .then(() => client.end())
  .catch((err) => console.log(err));

let modifiedCSV = [];
const obtainCSV = (storageArray) => {
  let csvData = fs.readFileSync(filepath).toString().split('\n');
  storageArray.push(csvData[0].split(','));
  for (let i = 1; i < csvData.length; i++) {
    let line = csvData[i].split(',');
    line[0] = Number(line[0]);
    line[1] = Number(line[1]);
    line[4] = Number(line[4]);

    if (line[3] === 'null') {
      line[3] = null;
    } else if (typeof line[3] === 'string') {
      line[3] = Number(line[3]);
    }
    storageArray.push(line)
  }
}
obtainCSV(modifiedCSV);

modifiedCSV.forEach((line) => {
  let query = 'insert into styles(id, product_id, name, sale_price, original_price, isDefault)\
values($1, $2, $3, $4, $5, $6)'

client.query(query, line)
  .catch((err) => console.log('error',err));
})
console.log('finished');