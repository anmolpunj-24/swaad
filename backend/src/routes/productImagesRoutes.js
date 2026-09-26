const express = require("express");
const routes = express.Router({ mergeParams: true });

const productImagesController = require("../controllers/admins/productImagesController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

const addProductImagesRules = require("../validations/addProductImageValidations");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  productImagesController.getAllProductImages,
);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  productImagesController.getOneProductImage,
);

routes.post(
  "/add",
  authenticateUserMiddleware,
  uploadMiddleware("image").array("images", 5),
  addProductImagesRules,
  validationMiddleware,
  productImagesController.addProductImage,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  productImagesController.updateProductImage,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  productImagesController.deleteProductImage,
);

module.exports = routes;
