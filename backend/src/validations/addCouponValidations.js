const { body } = require("express-validator");

const addCouponRules = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Coupon code is required!")
    .isLength({ max: 50 })
    .withMessage("Coupon code cannot exceed 50 characters!")
    .matches(/^[A-Za-z0-9_-]+$/)
    .withMessage(
      "Coupon code can contain only letters, numbers, hyphens, and underscores!",
    )
    .toUpperCase(),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters!"),

  body("discountType")
    .notEmpty()
    .withMessage("Discount type is required!")
    .isIn(["percentage", "fixed"])
    .withMessage("Discount type must be percentage or fixed!"),

  body("discountValue")
    .notEmpty()
    .withMessage("Discount value is required!")
    .isFloat({ gt: 0 })
    .withMessage("Discount value must be greater than zero!")
    .custom((value, { req }) => {
      if (req.body.discountType === "percentage" && Number(value) > 100) {
        throw new Error("Percentage discount cannot exceed 100!");
      }

      return true;
    }),

  body("minOrderAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum order amount cannot be negative!"),

  body("maxDiscountAmount")
    .optional({ values: "null" })
    .isFloat({ min: 0 })
    .withMessage("Maximum discount amount cannot be negative!"),

  body("startDate")
    .notEmpty()
    .withMessage("Start date is required!")
    .isISO8601()
    .withMessage("Start date must be a valid date!"),

  body("endDate")
    .notEmpty()
    .withMessage("End date is required!")
    .isISO8601()
    .withMessage("End date must be a valid date!")
    .custom((value, { req }) => {
      if (
        req.body.startDate &&
        new Date(value) <= new Date(req.body.startDate)
      ) {
        throw new Error("End date must be after start date!");
      }

      return true;
    }),

  body("usageLimit")
    .optional({ values: "null" })
    .isInt({ min: 1 })
    .withMessage("Usage limit must be a positive integer!"),
];

module.exports = addCouponRules;
