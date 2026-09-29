const express = require("express");
const routes = express.Router();

const ordersController = require("../controllers/customers/ordersController");

const authenticateUserMiddleware = require("../middlewares/authMiddleware");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  ordersController.getAllAvailableOrdersController,
);

routes.get(
  "/get/:id",
  authenticateUserMiddleware,
  ordersController.getOneAvailableOrderController,
);

module.exports = routes;
