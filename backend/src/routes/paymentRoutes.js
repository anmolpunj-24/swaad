const express = require("express");
const router = express.Router({ mergeParams: true });

const paymentController = require("../controllers/customers/paymentController");
const paymentValidations = require("../validations/paymentValidations");

router.post(
  "/order/:orderId/payment",
  paymentValidations.createPaymentValidation,
  paymentController.createPaymentController,
);

router.post(
  "/payment/:paymentId/verify",
  paymentValidations.verifyPaymentValidation,
  paymentController.verifyPaymentController,
);

module.exports = router;
