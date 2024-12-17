const express = require("express");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

const paymentController = require("../controller/paymentController");

router.post("/:id",authenticate,paymentController.createPaymentLink);
router.get("/",authenticate,paymentController.updatePaymentInformation);

module.exports = router;

