const mongoose = require('mongoose');



const stylesSchema = new mongoose.Schema({
  default: Boolean,
  original_price: Number,
  sale_price: Number,
  sku: [String:{size:String, quantity: Number}],
  photos: [{thumbnail: String, url: String}]
});



const overviewSchema = new mongoose.Schema({
  product_id: Number,
  product_name: String,
  slogan: String,
  category: String,
  price: Number,
  description: String,
  features: [{feature: String, value: String}]
});

const styleSchema = new mongoose.Schema({

  product_id: Number,
  results: [{
    style_id: Number,
    name: String,
    original_price: String,
    sale_price: String,
    default?: Boolean,
    photos: [{thumbnail: String, url: String}]}],
    sku: [ String: {
        size:String,
        quantity: Number
      }]
});

const relatedProduct = new mongoose.Schema({
  product_id: Number,
  related_products: [Number]
})