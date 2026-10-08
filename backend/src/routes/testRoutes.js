const express = require("express");
const routes = express.Router();

const testController = require("../controllers/testController");

const authenticateUserMiddleware = require("../middlewares/authMiddleware");

routes.post(
  "/order",
  authenticateUserMiddleware,
  testController.addTestOrdersController,
);

module.exports = routes;
