const controllers = require('./psql/controllers.js');
const router = require('express').Router();
const axios = require('axios');



router.get('/products', controllers.getProductList);
router.get('/products/:product_id', controllers.getProductInfo);
router.get('/products/:product_id/styles', controllers.getProductStyles);
router.get('/products/:product_id/related', controllers.getRelatedProducts);


module.exports = router;



