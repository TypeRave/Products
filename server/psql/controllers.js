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

  const product_id = req.params.product_id;
  let query = `
  SELECT *, overview,
  feature,features
  value, features
  FROM overview
  INNER JOIN features
  on overview.id = features.product_id
  WHERE overview.id = ${product_id} `

  if (product_id > 1000011) { //if allowed to insert, could compare to a query of
                              // select count(*) from overview;
    res.send('This product does not exist');
  } else {
    client.query(query)
      .then((data) => {
        let obj = {
          id: data.rows[0].id,
          name: data.rows[0].name,
          category: data.rows[0].category,
          slogan: data.rows[0].slogan,
          default_price: data.rows[0].default_price,
          description: data.rows[0].description,
          features: []
        }
        data.rows.forEach((entry) => {

          obj.features.push({
            feature: entry.feature,
            value: entry.value
          })
        })
        res.send(obj)
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404)
      });
  }
}





const getProductStyles = (req, res) => {

  let stylesObj = {
    product_id: req.params.product_id,
    results: []
  }
  let query = `
  SELECT styles.*, images.*, skus.*
  FROM styles
  INNER JOIN images on styles.id = images.style_id
  INNER JOIN skus on styles.id = skus.style_id
  WHERE styles.product_id = ${req.params.product_id}

  `
  client.query(query)
    .then((data) => {

      data.rows.forEach((entry) => {

        if (!stylesObj.results.some((s) => s.style_id === entry.style_id)) { //will iterate over results array and if exists, will not create new obj

          let style = {
            style_id: entry.style_id,
            name: entry.name,
            original_price: entry.original_price,
            sale_price: entry.sale_price,
            'default?': entry.isdefault,
            photos: [{
              thumbnail_url: entry.thumbnail_url,
              url: entry.url
            }],
            skus: {

            }
          }
          style.skus[entry.sku_id] = {
            quantity: entry.quantity,
            size: entry.size
          }
          stylesObj.results.push(style);

        } else {
          let indexOfStyle = 0;
          stylesObj.results.some((s, index) => {
            if (s.style_id === entry.style_id) {
              indexOfStyle = index;
              return true;
            }
          })

          stylesObj.results[indexOfStyle].photos.push({ //add pic obj to photo of prev existing style
            thumbnail_url: entry.thumbnail_url,
            url: entry.url
          })

          stylesObj.results[indexOfStyle].skus[entry.sku_id] = { //add sku obj to existing style
            quantity: entry.quantity,
            size: entry.size
          }

        }
      })
      res.send(stylesObj);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404)
    });

}

const getRelatedProducts = (req, res) => {
  let product_id = req.params.product_id;

  let query = `
  SELECT related_product_id from relatedProducts
  WHERE relatedProducts.current_product_id = ${product_id}`
  client.query(query)
    .then((data) => {
      let results = [];
      data.rows.forEach((id) => results.push(id.related_product_id));
      res.send(results)
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404)
    });
}


module.exports.getProductList = getProductList;
module.exports.getProductInfo = getProductInfo;
module.exports.getProductStyles = getProductStyles;
module.exports.getRelatedProducts = getRelatedProducts;