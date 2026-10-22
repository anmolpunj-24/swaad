const { body } = require("express-validator");

const addCategoryRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required!")
    .bail()
    .matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .withMessage("Category name can contain only letters and single spaces!")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Category name cannot exceed 100 characters!"),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required!")
    .bail()
    .matches(/^[a-z]+(?:-[a-z]+)*$/)
    .withMessage(
      "Slug can contain only lowercase letters separated by single hyphens!",
    ),
];

module.exports = addCategoryRules;
