const { body } = require("express-validator");

const addProductImageRules = [
  body("variants.*.images")
    .isArray({ min: 1, max: 5 })
    .withMessage("Each variant must have 1 to 5 images!"),

  body("variants.*.images.*.image")
    .notEmpty()
    .trim()
    .withMessage("Product image is required!"),

  body("variants.*.images.*.alt")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("Image alt text cannot exceed 150 characters!"),

  body("variants.*.images.*.isPrimary")
    .optional()
    .isBoolean()
    .withMessage("Primary image status must be true or false!"),

  body("variants.*.images.*.isActive")
    .optional()
    .isBoolean()
    .withMessage("Image status must be true or false!"),
];

module.exports = addProductImageRules;
