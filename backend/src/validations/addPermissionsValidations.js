const { body } = require("express-validator");

const addPermissionRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Permission name is required")
    .isString()
    .withMessage("Permission name must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Permission name must be between 2 and 100 characters"),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Permission slug is required")
    .isString()
    .withMessage("Permission slug must be a string")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage(
      "Permission slug must contain only lowercase letters, numbers, and hyphens",
    ),
];

module.exports = addPermissionRules;
