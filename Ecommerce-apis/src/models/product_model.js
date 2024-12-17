const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  sizes: [
    {
      name: { type: String },
      quantity: { type: Number },
    },
  ],
  ratings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ratings",
  },
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "reviews",
  },
  description: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  discountPercent: {
    type: Number,
    // required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  numRating: {
    type: Number,
    // required: true,
  },
  category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"categories"
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
