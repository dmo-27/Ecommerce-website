const Cart = require("../models/cart_model");
const CartItem = require("../models/cartitems_model");
const Product = require("../models/product_model");
const cartServices = require("./cart_services");
const Address = require("../models/address_model");
const OrderItem = require("../models/orderitems_model");
const Order = require("../models/order_model");

async function createOrder(user, shippAddress) {
  try {
    console.log("createOrder function started");

    console.log("Shipping Address:", shippAddress);

    let address;
    if (shippAddress._id) {
      const existAddress = await Address.findById(shippAddress._id);
      console.log("Existing address found:", existAddress);

      if (!existAddress) {
        throw new Error("Address not found with ID: " + shippAddress._id);
      }

      address = existAddress;
    } else {
      address = new Address(shippAddress);
      address.user = user;
      await address.save();
      console.log("New address saved:", address);

      if (!user.addresses) {
        user.addresses = [];
      }
      user.addresses.push(address);
      await user.save();
      console.log("User addresses updated:", user.addresses);
    }

    const cart = await cartServices.findUserCart(user._id);
    console.log("Cart found for user:", cart);

    if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
      throw new Error("No cart items found for user ID: " + user._id);
    }

    const orderItemList = [];

    for (const item of cart.cartItems) {
      const orderItem = new OrderItem({
        price: item.price,
        product: item.product, // Ensure item.product is a valid ObjectId
        quantity: item.quantity,
        size: item.size,
        userId: item.userId,
        discountPrice: item.discountPrice,
      });

      const createdOrderItem = await orderItem.save();

      // Populate the 'product' field
      await OrderItem.populate(createdOrderItem, { path: "product" });

      orderItemList.push(createdOrderItem);
      console.log("Created order item:", createdOrderItem); // Log each created order item
    }

    // Log the totalPrice and totalDiscountPrice from the cart
    console.log("Cart totalPrice:", cart.totalPrice);
    console.log("Cart totalDiscountPrice:", cart.discountedPrice);

    console.log("About to create order with values:");
    console.log("totalPrice:", Number(cart.totalPrice));
    console.log("totalDiscountPrice:", Number(cart.discountedPrice));
    console.log("discount:", Number(cart.discount));
    console.log("totalItems:", Number(cart.totalItem));

    const createdOrder = new Order({
      user,
      orderItems: orderItemList,
      shippingAddress: address,
      totalPrice: Number(cart.totalPrice),
      totalDiscountPrice: Number(cart.discountedPrice),
      discount: Number(cart.discount),
      totalItems: Number(cart.totalItem),
    });

    const savedOrder = await createdOrder.save();
    console.log("Order saved:", savedOrder);

    return savedOrder;
  } catch (error) {
    console.error("Error in createOrder:", error);
    throw new Error(error.message);
  }
}


async function placeOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "PLACED";
  order.paymentDetails.Status = "COMPLETED";

  return order.save();
}

async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CONFIRMED";

  return order.save();
}

async function shipOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "SHIPPED";

  return order.save();
}

async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "DELIVERED";

  return order.save();
}

async function cancelOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "CANCELLED";

  return order.save();
}

async function findOrderById(orderId) {
  try {
    const order = await Order.findById(orderId)
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
        },
      })
      .populate("shippingAddress")
      .populate("user");

    if (!order) {
      throw new Error(`Order not found with ID: ${orderId}`);
    }

    return order;
  } catch (error) {
    console.error("Error in findOrderById:", error);
    throw new Error(error.message);
  }
}


async function userOrderHistory(userId) {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findAllOrders() {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
}

async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
}

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  findOrderById,
  userOrderHistory,
  findAllOrders,
  deleteOrder,
};
