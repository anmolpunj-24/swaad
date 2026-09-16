const { body } = require("express-validator");
const mongoose = require("mongoose");

const addProductReviewRules = [
  body("productId")
    .notEmpty()
    .withMessage("Product is required!")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Please provide a valid product!"),

  body("rating")
    .notEmpty()
    .withMessage("Rating is required!")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5!"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 2, max: 1000 })
    .withMessage("Review cannot exceed 1000 characters!"),

  body("customerName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Please provide a valid customer name!"),

  body("customerCity")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Please provide a valid customer city!"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("Review status must be true or false!"),
];

module.exports = addProductReviewRules;
