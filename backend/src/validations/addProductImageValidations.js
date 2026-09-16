const { body } = require("express-validator");
const mongoose = require("mongoose");

const addProductImageRules = [
  body("images")
    .isArray({ min: 1 })
    .withMessage("At least one product image is required!"),

  body("images.*.image")
    .notEmpty()
    .trim()
    .withMessage("Product image is required!"),

  body("images.*.alt")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Image alt text cannot exceed 150 characters!"),

  body("images.*.isActive")
    .optional()
    .isBoolean()
    .withMessage("Image status must be true or false!"),
];

module.exports = addProductImageRules;
