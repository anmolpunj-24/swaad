const express = require("express");
const routes = express.Router({ mergeParams: true });

const productSeoController = require("../controllers/admins/productSeoController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

const addProductSeoRules = require("../validations/addProductSeoValidations");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  productSeoController.getAllProductSeos,
);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  productSeoController.getOneProductSeo,
);

routes.post(
  "/add",
  authenticateUserMiddleware,
  addProductSeoRules,
  validationMiddleware,
  productSeoController.addProductSeo,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  productSeoController.updateProductSeo,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  productSeoController.deleteProductSeo,
);

module.exports = routes;
