const express = require("express");
const routes = express.Router();

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
  "/get/:slug",
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
  "/update/:slug",
  authenticateUserMiddleware,
  pagesSeoController.updatePageSeo,
);

routes.delete(
  "/delete/:slug",
  authenticateUserMiddleware,
  pagesSeoController.deletePageSeo,
);

module.exports = routes;
