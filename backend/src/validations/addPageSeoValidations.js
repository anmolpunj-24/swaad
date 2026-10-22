const { body } = require("express-validator");

const addPageSeoRules = [
  body("slug")
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

  body("metaTitle")
    .trim()
    .notEmpty()
    .withMessage("Meta title is required!")
    .isLength({ max: 60 })
    .withMessage("Meta title cannot exceed 60 characters!"),

  body("metaDescription")
    .trim()
    .notEmpty()
    .withMessage("Meta description is required!")
    .isLength({ max: 160 })
    .withMessage("Meta description cannot exceed 160 characters!"),

  body("metaKeywords")
    .optional()
    .isArray()
    .withMessage("Meta keywords must be an array!"),

  body("metaKeywords.*")
    .trim()
    .notEmpty()
    .withMessage("Meta keyword cannot be empty!")
    .isLength({ max: 50 })
    .withMessage("Each meta keyword cannot exceed 50 characters!"),
];

module.exports = addPageSeoRules;
