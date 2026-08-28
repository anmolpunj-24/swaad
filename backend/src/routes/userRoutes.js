const express = require("express");
const routes = express.Router();

const userController = require("../controllers/admins/usersController");

const addUserRules = require("../validations/addUserValidations");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

routes.get("/getAll", authenticateUserMiddleware, userController.getAllUsers);

routes.get("/get/:id", authenticateUserMiddleware, userController.getOneUser);

routes.post(
  "/add",
  authenticateUserMiddleware,
  addUserRules,
  validationMiddleware,
  userController.addUser,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  userController.updateUser,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  userController.deleteUser,
);

routes.post(
  "/upload-profile",
  authenticateUserMiddleware,
  uploadMiddleware("image").single("profile"),
  userController.uploadProfile,
);

module.exports = routes;
