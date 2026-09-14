const { body } = require("express-validator");

const addCustomerAddressValidations = [
  body("addressLine_1")
    .trim()
    .notEmpty()
    .withMessage("Address Line 1 is required!")
    .isLength({ min: 2, max: 150 })
    .withMessage("Address Line 1 must be between 2 and 150 characters!"),

  body("addressLine_2").trim(),

  body("country")
    .trim()
    .notEmpty()
    .withMessage("Country is required!")
    .isLength({ min: 2, max: 100 })
    .withMessage("Country must be between 2 and 100 characters!"),

  body("state")
    .trim()
    .notEmpty()
    .withMessage("State is required!")
    .isLength({ min: 2, max: 100 })
    .withMessage("State must be between 2 and 100 characters!"),

  body("postalCode")
    .trim()
    .notEmpty()
    .withMessage("Postal code is required!")
    .matches(/^[1-9][0-9]{5}$/)
    .withMessage("Please enter a valid 6-digit postal code!"),

  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required!")
    .isLength({ min: 2, max: 100 })
    .withMessage("City must be between 2 and 100 characters!"),
];

module.exports = addCustomerAddressValidations;
