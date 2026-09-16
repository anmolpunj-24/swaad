const express = require("express");
const routes = express.Router({ mergeParams: true });

const productReviewsController = require("../controllers/admins/productReviewsController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

const addProductReviewRules = require("../validations/addProductReviewValidations");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  productReviewsController.getAllProductReviews,
);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  productReviewsController.getOneProductReview,
);

routes.post(
  "/add",
  authenticateUserMiddleware,
  addProductReviewRules,
  validationMiddleware,
  productReviewsController.addProductReview,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  productReviewsController.updateProductReview,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  productReviewsController.deleteProductReview,
);

module.exports = routes;
