const express = require("express");
const routes = express.Router();

const permissionsController = require("../controllers/admins/permissionsController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

const addPermissionsRules = require("../validations/addPermissionsValidations");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  permissionsController.getAllPermissions,
);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  permissionsController.getOnePermission,
);

routes.post(
  "/add",
  authenticateUserMiddleware,
  addPermissionsRules,
  validationMiddleware,
  permissionsController.addPermission,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  permissionsController.updatePermission,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  permissionsController.deletePermission,
);

module.exports = routes;
