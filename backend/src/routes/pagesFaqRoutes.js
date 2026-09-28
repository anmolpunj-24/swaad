const express = require("express");
const routes = express.Router();

const pagesFaqController = require("../controllers/admins/pagesFaqController");

const authenticateUserMiddleware = require("../middlewares/authMiddleware");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  pagesFaqController.getAllPagesFaq,
);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  pagesFaqController.getOnePageAllFaq,
);

routes.post("/add", authenticateUserMiddleware, pagesFaqController.addPageFaq);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  pagesFaqController.updateOnePageFaqs,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  pagesFaqController.deleteOnePageFaqs,
);

module.exports = routes;
