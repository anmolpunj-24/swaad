 const express = require("express");
const routes = express.Router({ mergeParams: true });

const productVariantController = require("../controllers/admins/productVariantController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

const addProductVariantsRules = require("../validations/addProductVariantsValidations");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  productVariantController.getAllProductVariants,
);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  productVariantController.getOneProductVariant,
);

routes.post(
  "/add",
  authenticateUserMiddleware,
  addProductVariantsRules, 
  validationMiddleware,
  productVariantController.addProductVariant,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  productVariantController.updateProductVariant,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  productVariantController.deleteProductVariant,
);

module.exports = routes;
