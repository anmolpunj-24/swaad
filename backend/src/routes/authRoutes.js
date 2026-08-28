const express = require("express");
const routes = express.Router();

const userLoginRules = require("../validations/userLoginValidations");
const userRegisterRules = require("../validations/userRegisterValidations");
const passwordValidationRules = require("../validations/passwordValidations");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

const authController = require("../controllers/customers/authController");

routes.post(
  "/login",
  authenticateUserMiddleware,
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

routes.post(
  "/forgot-password",
  authenticateUserMiddleware,
  authController.forgetPassword,
);

routes.post(
  "reset-password",
  authenticateUserMiddleware,
  authController.resetPassword,
);

routes.post(
  "/update-password",
  authenticateUserMiddleware,
  passwordValidationRules,
  validationMiddleware,
  authController.updatePassword,
);

routes.post("/logout", authenticateUserMiddleware, authController.logout);

module.exports = routes;
