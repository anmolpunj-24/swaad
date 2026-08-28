const express = require("express");
const routes = express.Router();

const customerController = require("../controllers/customers/customersController");

const authenticateUserMiddleware = require("../middlewares/authMiddleware");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  customerController.getAllCustomers,
);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  customerController.getOneCustomer,
);

routes.put(
  "/update/:id",
  authenticateUserMiddleware,
  customerController.updateCustomer,
);

routes.delete(
  "/delete/:id",
  authenticateUserMiddleware,
  customerController.deleteCustomer,
);

module.exports = routes;
