const express = require("express");
const routes = express.Router();

const userLoginRules = require("../validations/userLoginValidations");
const passwordValidationRules = require("../validations/passwordValidations");
const userRegisterRules = require("../validations/userRegisterValidations");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");

const adminAuthController = require("../controllers/admins/authController");

routes.post(
  "/login",
  userLoginRules,
  validationMiddleware,
  adminAuthController.userLogin,
);

routes.post(
  "/register",
  userRegisterRules,
  validationMiddleware,
  adminAuthController.registerUser,
);

routes.post("/forgot-password", adminAuthController.forgetPassword);

routes.post("reset-password", adminAuthController.resetPassword);

routes.post(
  "/update-password",
  passwordValidationRules,
  validationMiddleware,
  adminAuthController.updatePassword,
);

routes.post("/logout", adminAuthController.logout);

module.exports = routes;
