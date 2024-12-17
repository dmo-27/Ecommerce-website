const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  cartItems: [{
    type: mongoose.Schema.ObjectId,
    ref: "cartItems",
    // required: true,
  }],
  totalPrice: {
    type: Number,
    default: 0,
    // required: true,
  },
  totalItem: {
    type: Number,
    default: 0,
    // required: true,
  },
  discount: {
    type: Number,
    default: 0,
    // required: true,
  },
  discountedPrice:{
    type:Number,
    default:0 
  }
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
