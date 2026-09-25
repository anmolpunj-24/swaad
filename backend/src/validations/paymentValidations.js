const { body } = require("express-validator");

const createPaymentValidation = [];

const verifyPaymentValidation = [
  body("razorpayPaymentId")
    .trim()
    .notEmpty()
    .withMessage("Razorpay payment ID is required."),

  body("razorpaySignature")
    .trim()
    .notEmpty()
    .withMessage("Razorpay payment signature is required."),
];

module.exports = {
  createPaymentValidation,
  verifyPaymentValidation,
};
