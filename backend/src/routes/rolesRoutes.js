const express = require("express");
const routes = express.Router();

const rolesController = require("../controllers/admins/rolesController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

const addRolesRules = require("../validations/addRolesValidations");

routes.get("/getAll", authenticateUserMiddleware, rolesController.getAllRoles);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  rolesController.getOneRole,
);

routes.post(
  "/add",
  authenticateUserMiddleware,
  addRolesRules,
  validationMiddleware,
  rolesController.addRole,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  rolesController.updateRole,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  rolesController.deleteRole,
);

module.exports = routes;
