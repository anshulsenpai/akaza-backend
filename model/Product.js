const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min : 1,
    max : 5
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type : Number,
    default : 1
  }
}, { timestamps : true });

module.exports = mongoose.model("Product", ProductSchema);
