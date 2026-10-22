const express = require("express");
const routes = express.Router();

const categoryController = require("../controllers/admins/categoryController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

const addCategoryRules = require("../validations/addCategoryValidations");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  categoryController.getAllCategories,
);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  categoryController.getOneCategory,
);

routes.post(
  "/add",
  authenticateUserMiddleware,
  addCategoryRules,
  validationMiddleware,
  categoryController.addCategory,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  categoryController.updateCategory,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  categoryController.deleteCategory,
);

module.exports = routes;
