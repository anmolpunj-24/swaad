const { body } = require("express-validator");

const addUserRules = [
  body("name")
    .notEmpty()
    .withMessage("Name is required!")
    .bail()
    .trim()
    .matches(/^[a-zA-Z ]+$/)
    .withMessage("Name must contain only letters!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be between 3 and 20 characters!"),

  body("email")
    .notEmpty()
    .withMessage("Email is required!")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email!")
    .bail()
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/i)
    .withMessage("Email must end with @gmail.com!"),

  body("password")
    .notEmpty()
    .trim()
    .withMessage("Password is required!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .withMessage("Password does not match requirements!"),
];

module.exports = addUserRules;
