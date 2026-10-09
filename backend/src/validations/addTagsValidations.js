const { body } = require("express-validator");

const addBlogTagRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Tag name is required!")
    .isLength({ max: 100 })
    .withMessage("Tag name cannot exceed 100 characters!"),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required!")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage(
      "Slug must contain only lowercase letters, numbers, and hyphens.",
    ),
];

module.exports = addBlogTagRules;
