const { body } = require("express-validator");
const mongoose = require("mongoose");

const addProductRules = [
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

  body("product.tagLine")
    .notEmpty()
    .trim()
    .withMessage("Product tagline is required!")
    .isLength({ min: 2, max: 150 })
    .withMessage("Please provide a valid product tagline!"),

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

  body("product.price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Product price must be a valid positive number!"),

  body("product.description")
    .notEmpty()
    .trim()
    .withMessage("Product description is required!")
    .isLength({ max: 5000 })
    .withMessage("Description cannot exceed 5000 characters!"),

  body("product.stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock cannot be negative!"),

  body("product.hasVariants")
    .notEmpty()
    .withMessage("Please specify whether the product has variants!")
    .isBoolean()
    .withMessage("hasVariants must be true or false!"),

  body("product.isActive")
    .optional()
    .isBoolean()
    .withMessage("Product status must be true or false!"),

  body("product.seo.metaTitle")
    .optional()
    .trim()
    .isLength({ max: 60 })
    .withMessage("Meta title cannot exceed 60 characters!"),

  body("product.seo.metaDescription")
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage("Meta description cannot exceed 160 characters!"),

  body("product.seo.metaKeywords")
    .optional()
    .isArray()
    .withMessage("Meta keywords must be an array!"),

  body("product.seo.metaKeywords.*")
    .optional()
    .trim()
    .isString()
    .withMessage("Each meta keyword must be a string!"),
];

module.exports = addProductRules;
