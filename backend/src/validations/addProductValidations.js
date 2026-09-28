const { body } = require("express-validator");
const mongoose = require("mongoose");

const addProductRules = [
  body("product").isObject().withMessage("Product data is required!"),

  body("product.name")
    .notEmpty()
    .trim()
    .withMessage("Product name is required!")
    .isLength({ min: 3, max: 100 })
    .withMessage("Please provide a valid product name!"),

  body("product.slug")
    .notEmpty()
    .trim()
    .withMessage("Product slug is required!")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage("Please provide a valid product slug!"),

  body("product.categoryId")
    .notEmpty()
    .withMessage("Category is required!")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Please provide a valid category!"),

  body("product.categoryName")
    .notEmpty()
    .trim()
    .withMessage("Category name is required!")
    .isLength({ min: 2, max: 100 })
    .withMessage("Please provide a valid category name!"),

  body("product.isActive")
    .optional()
    .isBoolean()
    .withMessage("Product status must be true or false!"),
];

module.exports = addProductRules;
