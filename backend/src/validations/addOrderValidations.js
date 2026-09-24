const { body } = require("express-validator");

const addOrderValidations = [
  body("shippingAddress")
    .exists()
    .withMessage("Shipping address is required.")
    .isObject()
    .withMessage("Shipping address must be an object."),

  body("shippingAddress.name")
    .trim()
    .notEmpty()
    .withMessage("Shipping name is required.")
    .isLength({ max: 100 })
    .withMessage("Shipping name cannot exceed 100 characters."),

  body("shippingAddress.phone")
    .trim()
    .notEmpty()
    .withMessage("Shipping phone is required.")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Please provide a valid phone number."),

  body("shippingAddress.addressLine1")
    .trim()
    .notEmpty()
    .withMessage("Address line 1 is required.")
    .isLength({ max: 200 })
    .withMessage("Address line 1 cannot exceed 200 characters."),

  body("shippingAddress.addressLine2")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 })
    .withMessage("Address line 2 cannot exceed 200 characters."),

  body("shippingAddress.city")
    .trim()
    .notEmpty()
    .withMessage("City is required.")
    .isLength({ max: 100 })
    .withMessage("City cannot exceed 100 characters."),

  body("shippingAddress.state")
    .trim()
    .notEmpty()
    .withMessage("State is required.")
    .isLength({ max: 100 })
    .withMessage("State cannot exceed 100 characters."),

  body("shippingAddress.pincode")
    .trim()
    .notEmpty()
    .withMessage("Pincode is required.")
    .matches(/^\d{6}$/)
    .withMessage("Please provide a valid 6-digit pincode."),

  body("shippingAddress.country")
    .trim()
    .notEmpty()
    .withMessage("Country is required.")
    .isLength({ max: 100 })
    .withMessage("Country cannot exceed 100 characters."),
];

module.exports = addOrderValidations;
