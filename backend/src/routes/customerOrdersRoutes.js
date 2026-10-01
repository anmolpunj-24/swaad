const express = require("express");
const routes = express.Router({ mergeParams: true });

const ordersController = require("../controllers/customers/ordersController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

const addOrderRules = require("../validations/addOrderValidations");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  ordersController.getAllCustomerOrdersController,
);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  ordersController.getOneCustomerOrderController,
);

routes.post(
  "/add",
  authenticateUserMiddleware,
  addOrderRules,
  validationMiddleware,
  ordersController.addCustomerOrderController,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  ordersController.updateCustomerOrderController,
);

module.exports = routes;
