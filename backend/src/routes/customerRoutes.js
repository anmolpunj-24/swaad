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
  "/get/:uuid",
  authenticateUserMiddleware,
  customerController.getOneCustomer,
);

routes.put(
  "/update/:uuid",
  authenticateUserMiddleware,
  customerController.updateCustomer,
);

routes.delete(
  "/delete/:uuid",
  authenticateUserMiddleware,
  customerController.deleteCustomer,
);

module.exports = routes;
