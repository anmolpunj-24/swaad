const { body } = require("express-validator");
const mongoose = require("mongoose");

const addProductVariantsRules = [
  body("variants").custom((value, { req }) => {
    const hasVariants = req.body.product?.hasVariants;

    if (hasVariants === true || hasVariants === "true") {
      if (!Array.isArray(value) || value.length < 1) {
        throw new Error(
          "At least one product variant is required when variants are enabled!",
        );
      }
    }

    if (hasVariants === false || hasVariants === "false") {
      if (value !== undefined && !Array.isArray(value)) {
        throw new Error("Variants must be an array!");
      }
    }

    return true;
  }),

  body("variants.*.name")
    .if((value, { req }) => {
      return (
        req.body.product?.hasVariants === true ||
        req.body.product?.hasVariants === "true"
      );
    })
    .notEmpty()
    .trim()
    .withMessage("Variant name is required!")
    .isLength({ min: 1, max: 100 })
    .withMessage("Please provide a valid variant name!"),

  body("variants.*.slug")
    .if((value, { req }) => {
      return (
        req.body.product?.hasVariants === true ||
        req.body.product?.hasVariants === "true"
      );
    })
    .notEmpty()
    .trim()
    .withMessage("Variant slug is required!")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage("Please provide a valid variant slug!"),

  body("variants.*.tagLine")
    .if((value, { req }) => {
      return (
        req.body.product?.hasVariants === true ||
        req.body.product?.hasVariants === "true"
      );
    })
    .notEmpty()
    .trim()
    .withMessage("Variant tagline is required!")
    .isLength({ min: 2, max: 150 })
    .withMessage("Please provide a valid variant tagline!"),

  body("variants.*.price")
    .if((value, { req }) => {
      return (
        req.body.product?.hasVariants === true ||
        req.body.product?.hasVariants === "true"
      );
    })
    .notEmpty()
    .withMessage("Variant price is required!")
    .isFloat({ min: 0 })
    .withMessage("Variant price must be a valid positive number!"),

  body("variants.*.description")
    .if((value, { req }) => {
      return (
        req.body.product?.hasVariants === true ||
        req.body.product?.hasVariants === "true"
      );
    })
    .notEmpty()
    .trim()
    .withMessage("Variant description is required!")
    .isLength({ max: 5000 })
    .withMessage("Description cannot exceed 5000 characters!"),

  body("variants.*.stock")
    .if((value, { req }) => {
      return (
        req.body.product?.hasVariants === true ||
        req.body.product?.hasVariants === "true"
      );
    })
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock cannot be negative!"),

  body("variants.*.isActive")
    .if((value, { req }) => {
      return (
        req.body.product?.hasVariants === true ||
        req.body.product?.hasVariants === "true"
      );
    })
    .optional()
    .isBoolean()
    .withMessage("Variant status must be true or false!"),
];

module.exports = addProductVariantsRules;
