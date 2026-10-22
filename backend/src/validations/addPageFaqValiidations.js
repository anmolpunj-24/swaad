const { body } = require("express-validator");

const addPageFaqRules = [
  body("pageSlug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required!")
    .bail()
    .matches(/^[a-z]+(?:-[a-z]+)*$/)
    .withMessage(
      "Slug can contain only lowercase letters and single hyphens between words!",
    ),

  body("pageName")
    .trim()
    .notEmpty()
    .withMessage("Page name is required!")
    .bail()
    .matches(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .withMessage(
      "Page name can contain only uppercase and lowercase letters with single spaces!",
    )
    .bail()
    .isLength({ max: 100 })
    .withMessage("Page name cannot exceed 100 characters!"),
];

module.exports = addPageFaqRules;
