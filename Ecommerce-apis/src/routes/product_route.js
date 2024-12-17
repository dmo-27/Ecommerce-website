const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const authenticate = require("../middleware/authenticate");


router.get("/id/:id", authenticate, productController.findProductById);
router.get("/", authenticate, productController.getAllProducts);


module.exports = router;
