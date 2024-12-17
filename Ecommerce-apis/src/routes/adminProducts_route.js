const express = require("express");
const router = express.Router(); // Invoke express.Router() to create a new router instance
const productController = require("../controller/productController");
const authenticate = require("../middleware/authenticate");

router.post("/", authenticate, productController.createProduct);
router.post("/creates", authenticate, productController.createMultipleProduct);
router.delete("/:id", authenticate, productController.deleteProduct);
router.put("/:id", authenticate, productController.updateProduct);

module.exports = router;
