const express = require("express");
const routes = express.Router();

const dashboardController = require("../controllers/admins/dashboardController");

const authenticateUserMiddleware = require("../middlewares/authMiddleware");

routes.get(
  "/get",
  authenticateUserMiddleware,
  dashboardController.getDashboardData,
);

module.exports = routes;
