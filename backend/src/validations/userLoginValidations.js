const { body } = require("express-validator");

const userLoginRules = [
  body("email")
    .notEmpty()
    .trim()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Please provide a valid email!"),

  body("password")
    .notEmpty()
    .trim()
    .withMessage("Password is required!")
    .withMessage("Password does not match!"),
];

module.exports = userLoginRules;
