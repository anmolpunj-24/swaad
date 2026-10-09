
const { body } = require("express-validator");

const addBlogRules = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Blog title is required!")
    .isLength({ max: 200 })
    .withMessage("Blog title cannot exceed 200 characters!"),

  body("slug")
    .trim()
    .notEmpty()
    .withMessage("Slug is required!")
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage(
      "Slug must contain only lowercase letters, numbers, and hyphens.",
    ),

  body("excerpt")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Excerpt cannot exceed 500 characters!"),

  body("content")
    .notEmpty()
    .withMessage("Blog content is required!"),

  body("featuredImage")
    .optional()
    .trim(),

  body("categoryId")
    .notEmpty()
    .withMessage("Blog category is required!")
    .isMongoId()
    .withMessage("Invalid category ID!"),

  body("tagIds")
    .optional()
    .isArray()
    .withMessage("Tag IDs must be an array!"),

  body("tagIds.*")
    .isMongoId()
    .withMessage("Each tag ID must be a valid MongoDB ObjectId!"),

  body("status")
    .optional()
    .isIn(["draft", "published", "deleted"])
    .withMessage("Status must be draft, published, or deleted!"),

  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("Featured status must be a boolean!"),

  body("seo")
    .optional()
    .isObject()
    .withMessage("SEO must be an object!"),

  body("seo.metaTitle")
    .optional()
    .trim()
    .isLength({ max: 60 })
    .withMessage("Meta title cannot exceed 60 characters!"),

  body("seo.metaDescription")
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage("Meta description cannot exceed 160 characters!"),

  body("seo.metaKeywords")
    .optional()
    .isArray()
    .withMessage("Meta keywords must be an array!"),

  body("seo.metaKeywords.*")
    .trim()
    .notEmpty()
    .withMessage("Meta keyword cannot be empty!")
    .isLength({ max: 50 })
    .withMessage("Each meta keyword cannot exceed 50 characters!"),

  body("seo.canonicalUrl")
    .optional()
    .trim()
    .isURL({ protocols: ["http", "https"], require_protocol: true })
    .withMessage("Canonical URL must be a valid HTTP or HTTPS URL!"),

  body("seo.ogTitle")
    .optional()
    .trim(),

  body("seo.ogDescription")
    .optional()
    .trim(),

  body("seo.ogImage")
    .optional()
    .trim(),

  body("seo.robots")
    .optional()
    .isIn([
      "index,follow",
      "noindex,follow",
      "index,nofollow",
      "noindex,nofollow",
    ])
    .withMessage("Invalid robots directive!"),

];

module.exports = addBlogRules;