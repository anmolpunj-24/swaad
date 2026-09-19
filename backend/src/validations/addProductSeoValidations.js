const { body } = require("express-validator");

const addProductSeoRules = [
  body("variants.*.seo")
    .optional()
    .isObject()
    .withMessage("SEO must be an object!"),

  body("variants.*.seo.metaTitle")
    .optional()
    .trim()
    .isLength({ max: 60 })
    .withMessage("Meta title cannot exceed 60 characters!"),

  body("variants.*.seo.metaDescription")
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage("Meta description cannot exceed 160 characters!"),

  body("variants.*.seo.metaKeywords")
    .optional()
    .isArray()
    .withMessage("Meta keywords must be an array!"),

  body("variants.*.seo.metaKeywords.*")
    .isString()
    .trim()
    .withMessage("Each meta keyword must be a string!"),
];

module.exports = addProductSeoRules;
