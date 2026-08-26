const express = require("express");
const routes = express.Router();

const userController = require("../controllers/admins/usersController");

const addUserRules = require("../validations/addUserValidations");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");

const uploadMiddleware = require("../middlewares/uploadMiddleware")

routes.get("/getAll", userController.getAllUsers);

routes.get("/get/:id", userController.getOneUser);

routes.post("/add", addUserRules, validationMiddleware, userController.addUser);

routes.put("/update/:id", userController.updateUser);

routes.delete("/delete/:id", userController.deleteUser);

routes.post(
  "/upload-profile",
  uploadMiddleware("image").single("profile"),
  userController.uploadProfile,
);

module.exports = routes;
