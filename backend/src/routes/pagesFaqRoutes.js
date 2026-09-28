const express = require("express");
const routes = express.Router();

const pagesFaqController = require("../controllers/admins/pagesFaqController");

const authenticateUserMiddleware = require("../middlewares/authMiddleware");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  pagesFaqController.getOnePageAllFaqs,
);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  pagesFaqController.getOnePageOneFaq,
);

routes.post("/add", authenticateUserMiddleware, pagesFaqController.addPageFaq);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  pagesFaqController.updateOnePageOneFaq,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  pagesFaqController.deleteOnePageOneFaq,
);

module.exports = routes;
