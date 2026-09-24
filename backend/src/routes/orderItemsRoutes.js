const express = require("express");
const routes = express.Router({ mergeParams: true });

const orderItemsController = require("../controllers/customers/orderItemsController");

const validationMiddleware = require("../middlewares/globalValidationMiddleware");
const authenticateUserMiddleware = require("../middlewares/authMiddleware");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  orderItemsController.getAllOrderItemsController,
);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  orderItemsController.getOneOrderItemController,
);

routes.post(
  "/add",
  authenticateUserMiddleware,
  validationMiddleware,
  orderItemsController.addOrderItemController,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  orderItemsController.updateOrderItemController,
);

module.exports = routes;
