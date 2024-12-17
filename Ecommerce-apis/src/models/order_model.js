const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
  orderItems: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "orderItems",
      required: true,
    },
  ],
  orderDate: {
    type: Date,
    // required: true,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "addresses",
  },
  paymentDetails: {
    paymentMethod: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    Status: {
      type: String,
      default: "PENDING",
    },
    totalPrice: {
      type: Number,
      // required: true,
    },
    totalDiscountPrice: {
      type: Number,
      // required: true,
    },
    discount: {
      type: Number,
      // required: true,
    },
    totalItem: {
      type: Number,
      // required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  totalPrice: { type: Number, required: true },
  totalDiscountPrice: { type: Number, required: true },
  discount: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  orderStatus: {
    type: String,
    // required: true,
    default: "PENDING",
  },
});

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
