const {Client} = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  port: process.env.PG_PORT,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
});

client.connect()
.then(() => console.log('connected'))
.catch((err) => console.log(err));



const getProductList = (req, res) => {
  let {page, count} = req.query;
  page = page || 1;
  count = count || 5;
  const startingPoint = (page * count) - count + 1;
  let query = `
  SELECT * FROM overview
  OFFSET ${startingPoint}
  LIMIT ${count}`;

  client.query(query)
    .then((data) => res.send(data.rows))
    .catch((err) => console.log(err));

}

const getProductInfo = (req, res) => {
  // console.log('req', req.params[0].split('/'));
  const product_id = req.params[0].split('/')[1]
  let query = `
  SELECT overview.*, features(feature, value)
  FROM overview
  INNER JOIN features
  ON overview.id = features.product_id; `
  client.query(query)
    .then((data) => res.send(data.rows))
    .catch((err) => console.log(err));

}


module.exports.getProductList = getProductList;
module.exports.getProductInfo = getProductInfo;