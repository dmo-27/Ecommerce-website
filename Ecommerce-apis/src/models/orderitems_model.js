const mongoose = require("mongoose");

const orderItemsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "products",
    required: true,
  },

  size: {
    type: String,
    default: 0,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  discountPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
});

const OrderItem = mongoose.model("orderItems", orderItemsSchema);

module.exports = OrderItem;
