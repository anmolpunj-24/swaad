const express = require("express");
const routes = express.Router({ mergeParams: true });

const customerCartController = require("../controllers/customers/cartController");

const authenticateUserMiddleware = require("../middlewares/authMiddleware");

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  customerCartController.getCustomerCart,
);

routes.post(
  "/add",
  authenticateUserMiddleware,
  customerCartController.addToCustomerCart,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  customerCartController.updateCustomerCartItem,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  customerCartController.deleteCustomerCartItem,
);

routes.delete(
  "/clear",
  authenticateUserMiddleware,
  customerCartController.clearCustomerCart,
);

module.exports = routes;
