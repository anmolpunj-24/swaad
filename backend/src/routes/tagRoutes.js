const express = require("express");
const routes = express.Router();

const tagsController = require("../controllers/admins/tagsController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

const addTagRules = require("../validations/addTagsValidations");

routes.get("/getAll", authenticateUserMiddleware, tagsController.getAllTags);

routes.get("/get/:id", authenticateUserMiddleware, tagsController.getOneTag);

routes.post(
  "/add",
  authenticateUserMiddleware,
  addTagRules,
  validationMiddleware,
  tagsController.addTag,
);

routes.put("/update/:id", authenticateUserMiddleware, tagsController.updateTag);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  tagsController.deleteTag,
);

module.exports = routes;
