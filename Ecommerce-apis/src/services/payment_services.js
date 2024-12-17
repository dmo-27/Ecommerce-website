const razorpay = require("../config/razorpayClient");
const orderService = require("../services/order_sevice");

const createPaymentLink = async (orderId) => {
  try {
    const order = await orderService.findOrderById(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }

    console.log("The order is", order);

    const paymentLinkRequest = {
      amount: order.totalPrice * 100, // Ensure order.totalPrice is a valid number
      currency: "INR",
      customer: {
        name: `${order.user.firstName} ${order.user.lastName}`,
        contact: order.user.mobile,
        email: order.user.email,
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      callback_url: `http://localhost:3000/payment/${orderId}`,
      callback_method: "get",
    };

    console.log("Payment link request is", paymentLinkRequest);

    const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

    console.log("Payment link is", paymentLink);

    const paymentLinkId = paymentLink.id;
    const payment_link_url = paymentLink.short_url;

    const resData = {
      paymentLinkId,
      payment_link_url,
    };

    return resData;
  } catch (error) {
    // Log detailed error information
    console.error("Error creating payment link:", error.response ? error.response.data : error.message);
    throw new Error(error.message || "An unknown error occurred while creating the payment link");
  }
};

const updatePaymentInformation = async (reqData) => {
  const paymentId = reqData.payment_id;
  const orderId = reqData.order_id;
  try {
    const order = await orderService.findOrderById(orderId);
    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.status === "captured") {
      order.paymentDetails.paymentId = paymentId;
      order.paymentDetails.Status = "COMPLETED";
      order.orderStatus = "PLACED";

      await order.save();
    }

    const resData = { message: "Your order is placed", success: true };
    return resData; // Returning the response data
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createPaymentLink,
  updatePaymentInformation,
};
