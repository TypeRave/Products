const mongoose = require('mongoose');



const stylesSchema = new mongoose.Schema({
  default: Boolean,
  original_price: Number,
  sale_price: Number,
  sku: [String:{size:String, quantity: Number}],
  photos: [{thumbnail: String, url: String}]
});



const productSchema = new mongoose.Schema({
  product_id: Number,
  product_name: String,
  slogan: String,
  category: String,
  price: Number,
  description: String,
  styles: [{type: Schema.ObjectID, ref: 'Styles'}],
  related_products: [Number],
  features: [{feature: String, value: String}]
})