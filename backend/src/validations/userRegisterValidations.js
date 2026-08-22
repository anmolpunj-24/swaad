const { body } = require("express-validator");

const userRegistrationRules = [
  body("name")
    .notEmpty()
    .trim()
    .withMessage("Name is required!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Please provide a valid name!"),

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
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .withMessage("Password does not match requirements!"),
];

module.exports = userRegistrationRules;
