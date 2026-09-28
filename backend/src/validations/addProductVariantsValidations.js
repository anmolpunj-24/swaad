const { body } = require("express-validator");

const addProductVariantRules = [
  body("variants")
    .isArray({ min: 1 })
    .withMessage("At least one product variant is required!"),

  body("variants.*.tagLine")
    .notEmpty()
    .trim()
    .withMessage("Variant tagline is required!")
    .isLength({ min: 2, max: 150 })
    .withMessage("Please provide a valid variant tagline!"),

  body("variants.*.mrp")
    .notEmpty()
    .withMessage("Variant mrp is required!")
    .isFloat({ min: 0 })
    .withMessage("Variant mrp must be a valid positive number!"),

  body("variants.*.sellingPrice")
    .notEmpty()
    .withMessage("Variant sellingPrice is required!")
    .isFloat({ min: 0 })
    .withMessage("Variant sellingPrice must be a valid positive number!"),

  body("variants.*.description")
    .notEmpty()
    .trim()
    .withMessage("Variant description is required!")
    .isLength({ max: 5000 })
    .withMessage("Description cannot exceed 5000 characters!"),

  body("variants.*.stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock cannot be negative!"),

  body("variants.*.isActive")
    .optional()
    .isBoolean()
    .withMessage("Variant status must be true or false!"),
];

module.exports = addProductVariantRules;
