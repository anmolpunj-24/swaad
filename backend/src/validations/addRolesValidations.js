const { body } = require("express-validator");

const addRoleRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Role name is required")
    .isString()
    .withMessage("Role name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Role name must be between 2 and 50 characters"),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Role slug is required")
    .isString()
    .withMessage("Role slug must be a string")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage(
      "Role slug must contain only lowercase letters, numbers, and hyphens",
    ),
];

module.exports = addRoleRules;
