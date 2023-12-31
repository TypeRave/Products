const mongoose = require('mongoose');



// const overviewSchema = new mongoose.Schema({
//   product_id: Number,
//   product_name: String,
//   slogan: String,
//   category: String,
//   price: Number,
//   description: String,
//   features: [{feature: String, value: String}]
// });

const ProductSchema = new mongoose.Schema({

  product_id: Number,
  product_name: String,
  slogan: String,
  category: String,
  price: Number,
  description: String,
  features: [{
    feature: String,
    value: String
  }],
  results: [{
    style_id: Number,
    name: String,
    original_price: String,
    sale_price: String,
    default?: Boolean,
    photos: [{
      thumbnail_url:
      String, url: String
    }],
    skus: [{
      sku: String,
      type: Object,
      default: {
        size: String,
        quantity: Number
      }
    }]
  }],
  related_products: [Number]
});
// using array for the sku since there is more than one sku present

// const relatedProductSchema = new mongoose.Schema({
//   product_id: Number,
//   related_products: [Number]
// });

const Products = mongoose.model('Products', ProductSchema)
// const RelatedProduct = mongoose.model('RelatedProduct', relatedProductSchema);
// const Styles = mongoose.model('Styles', styleSchema);
// const Overview = mongoose.model('Overview', overviewSchema);
module.exports.Products = Products;
// module.exports = {
//   RelatedProduct,
//   Styles,
//   Overview
// }
