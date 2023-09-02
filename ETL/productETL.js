require('dotenv').config();

const fs = require('fs');
const path = require('path');
const {Client} = require('pg');



const client = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  port: process.env.PG_PORT,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
});

const filepath = path.join(__dirname,'../data/product.csv' );


fs.access(filepath, (err, results) => {
  if(err) {
    console.log('file not found');
  } else {
    console.log('file found');
  }
})

const copy = `copy overview(id, name, slogan, description, category, default_price)
 from '${filepath}'
 delimiter ','
 csv header`
client.query('CREATE TABLE IF NOT EXISTS overview (\
  id SERIAL PRIMARY KEY,\
  name VARCHAR(50),\
  category VARCHAR(20),\
  slogan VARCHAR(1000),\
  default_price INTEGER,\
  description VARCHAR(1000)\
)')
  .then(() => {
    console.log('table created');
  })
  .catch((err) => console.log(err));

const bulkInsert = async (data) => {

  client.connect()
  .then(() => console.log('successfully connected to db'))
  .then(() => client.query(copy))
  .then(() => console.log('completed'))
  .catch((err) => console.log(err))

}
let filestream = fs.createReadStream(filepath);
let results = [];

filestream.on('data', (chunk) => {
  results.push(chunk.toString());

})
filestream.on('end', () => {
  bulkInsert(results);

})
