const express = require("express");
const routes = express.Router({ mergeParams: true });

const pagesSeoController = require("../controllers/admins/pagesSeoController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

const addPagesSeoRules = require("../validations/addPageSeoValidations");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  pagesSeoController.getAllPagesSeo,
);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  pagesSeoController.getOnePageSeo,
);

routes.post(
  "/add",
  authenticateUserMiddleware,
  addPagesSeoRules,
  validationMiddleware,
  pagesSeoController.addPageSeo,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  pagesSeoController.updatePageSeo,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  pagesSeoController.deletePageSeo,
);

module.exports = routes;
