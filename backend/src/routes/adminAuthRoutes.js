const express = require("express");
const routes = express.Router();

const userLoginRules = require("../validations/userLoginValidations");
const passwordValidationRules = require("../validations/passwordValidations");
const userRegisterRules = require("../validations/userRegisterValidations");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

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

routes.post(
  "/forgot-password",
  authenticateUserMiddleware,
  adminAuthController.forgetPassword,
);

routes.post(
  "/reset-password",
  authenticateUserMiddleware,
  adminAuthController.resetPassword,
);

routes.post(
  "/update-password",
  authenticateUserMiddleware,
  passwordValidationRules,
  validationMiddleware,
  adminAuthController.updatePassword,
);

routes.post(
  "/logout-current-device",
  authenticateUserMiddleware,
  adminAuthController.logOutOfCurrentDevice,
);

routes.post(
  "/logout-all-devices",
  authenticateUserMiddleware,
  adminAuthController.logOutOfAllDevices,
);

routes.get(
  "/current-user",
  authenticateUserMiddleware,
  adminAuthController.getCurrentUser,
);

module.exports = routes;
