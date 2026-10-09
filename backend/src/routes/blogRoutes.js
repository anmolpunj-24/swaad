const express = require("express");
const routes = express.Router();

const blogsController = require("../controllers/admins/blogsController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

const addBlogsRules = require("../validations/addBlogValidations");

routes.get("/getAll", authenticateUserMiddleware, blogsController.getAllBlogs);

routes.get("/get/:id", authenticateUserMiddleware, blogsController.getOneBlog);

routes.post(
  "/add",
  authenticateUserMiddleware,
  addBlogsRules,
  validationMiddleware,
  blogsController.addBlog,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  blogsController.updateBlog,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  blogsController.deleteBlog,
);

module.exports = routes;
