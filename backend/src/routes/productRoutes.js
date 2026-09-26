const express = require("express");
const routes = express.Router();

const productController = require("../controllers/admins/productController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const parseProductFormDataMiddleware = require("../middlewares/parseProductFormDataMiddleware");

const addProductRules = require("../validations/addProductValidations");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  productController.getAllProducts,
);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  productController.getOneProduct,
);

routes.post(
  "/add",
  authenticateUserMiddleware,
  uploadMiddleware("image").array("images", 50),
  parseProductFormDataMiddleware,
  addProductRules,
  validationMiddleware,
  productController.addProduct,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  uploadMiddleware("image").array("images", 50),
  parseProductFormDataMiddleware,
  productController.updateProduct,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  productController.deleteProduct,
);

module.exports = routes;
