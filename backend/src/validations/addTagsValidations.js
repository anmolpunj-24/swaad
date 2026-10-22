const { body } = require("express-validator");

const addBlogTagRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Tag name is required!")
    .bail()
    .matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .withMessage("Tag name can contain only letters and single spaces!")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Tag name cannot exceed 100 characters!"),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required!")
    .bail()
    .matches(/^[a-z]+(?:-[a-z]+)*$/)
    .withMessage("Slug must contain only lowercase letters and hyphens!"),
];

module.exports = addBlogTagRules;
