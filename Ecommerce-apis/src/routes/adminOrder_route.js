const express = require("express");
const router = express.Router();

const orderController = require("../controller/adminOrderController");
const authenticate = require("../middleware/authenticate");

router.get("/",authenticate,orderController.getAllOrders);
router.get("/:orderId/confirmed",authenticate,orderController.confirmationOrders);

router.get(
  "/:orderId/ship",
  authenticate,
  orderController.shippOrders
);

router.get(
  "/:orderId/deliver",
  authenticate,
  orderController.deliverOrders
);

router.get(
  "/:orderId/cancel",
  authenticate,
  orderController.cancellOrders
);

router.get(
  "/:orderId/delete",
  authenticate,
  orderController.deleteOrders
);

module.exports=router;