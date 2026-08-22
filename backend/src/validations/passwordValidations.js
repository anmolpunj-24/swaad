const { body } = require("express-validator");

const passwordValidationRules = [
  body("newPassword")
    .notEmpty()
    .trim()
    .withMessage("Password is required!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    )
    .withMessage("Password does not match the requirements!"),
];

module.exports = passwordValidationRules;
