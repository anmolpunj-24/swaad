const express = require("express");
const routes = express.Router();

const pagesFaqController = require("../controllers/admins/pagesFaqController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

const addPagesFaqRules = require("../validations/addPageFaqValiidations");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  pagesFaqController.getAllPagesFaq,
);

routes.get(
  "/get/:pageSlug",
  authenticateUserMiddleware,
  pagesFaqController.getOnePageAllFaq,
);

routes.post(
  "/add",
  authenticateUserMiddleware,
  addPagesFaqRules,
  validationMiddleware,
  pagesFaqController.addPageFaq,
);

routes.put(
  "/update/:pageSlug",
  authenticateUserMiddleware,
  pagesFaqController.updateOnePageFaqs,
);

routes.delete(
  "/delete/:pageSlug",
  authenticateUserMiddleware,
  pagesFaqController.deleteOnePageFaqs,
);

module.exports = routes;
