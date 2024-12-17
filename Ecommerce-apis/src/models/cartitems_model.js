const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.ObjectId,
    ref: "cart",
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "products",
    // required: true,
  },

  size: {
    type: String,
    default: 0,
    // required: true,
  },
  quantity: {
    type: Number,
    default: 0,
    // required: true,
  },
  price: {
    type: Number,
    default: 0,
    // required: true,
  },
  discountPrice: {
    type: Number,
    default: 0,
    // required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required:true
  },
});

const CartItem = mongoose.model("cartItems", cartItemSchema);

module.exports = CartItem;
