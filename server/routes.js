const controllers = require('./controllers.js');
const router = require('express').Router();
const axios = require('axios');



router.get('/products', controllers.getProductList);
router.get('/products*', controllers.getProductInfo);


module.exports = router;



