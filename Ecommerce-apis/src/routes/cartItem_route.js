const express = require("express");
const router = express.Router();
const cartItemController = require("../controller/cartItemController");
const authenticate = require("../middleware/authenticate");

router.put("/:id", authenticate,cartItemController.updateCartItem);
router.delete("/:id", authenticate, cartItemController.removeCartItem);

module.exports = router;
