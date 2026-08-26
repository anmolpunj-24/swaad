const express = require("express");
const routes = express.Router();

const userLoginRules = require("../validations/userLoginValidations");
const userRegisterRules = require("../validations/userRegisterValidations");
const passwordValidationRules = require("../validations/passwordValidations");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");

const authController = require("../controllers/customers/authController");

routes.post(
  "/login",
  userLoginRules,
  validationMiddleware,
  authController.userLogin,
);

routes.post(
  "/register",
  userRegisterRules,
  validationMiddleware,
  authController.registerUser,
);

routes.post("/forgot-password", authController.forgetPassword);

routes.post("reset-password", authController.resetPassword);

routes.post(
  "/update-password",
  passwordValidationRules,
  validationMiddleware,
  authController.updatePassword,
);

routes.post("/logout", authController.logout);

module.exports = routes;
