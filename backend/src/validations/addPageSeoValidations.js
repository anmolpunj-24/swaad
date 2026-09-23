const { body } = require("express-validator");

const addPageSeoRules = [
  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required!")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage(
      "Slug must contain only lowercase letters, numbers, and hyphens.",
    ),

  body("pageName")
    .trim()
    .notEmpty()
    .withMessage("Page name is required!")
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
