const express = require("express");
const routes = express.Router();

const blogsController = require("../controllers/admins/blogsController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");
const normalizeBlogMultipartMiddleware = require("../middlewares/normalizeBlogMultipartMiddleware");

const upload = require("../middlewares/uploadMiddleware");

const addBlogsRules = require("../validations/addBlogValidations");
const blogUpload = upload("image");

const parseBlogForm = [
  authenticateUserMiddleware,
  blogUpload.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "contentImages", maxCount: 20 },
  ]),
  normalizeBlogMultipartMiddleware,
];

routes.get("/getAll", authenticateUserMiddleware, blogsController.getAllBlogs);

routes.get("/get/:id", authenticateUserMiddleware, blogsController.getOneBlog);

routes.post(
  "/add",
  ...parseBlogForm,
  addBlogsRules,
  validationMiddleware,
  blogsController.addBlog,
);

routes.put("/update/:id", ...parseBlogForm, blogsController.updateBlog);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  blogsController.deleteBlog,
);

module.exports = routes;
