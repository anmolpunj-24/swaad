const express = require("express");
const routes = express.Router({ mergeParams: true });

const shipmentController = require("../controllers/customers/shipmentController");

const authenticateUserMiddleware = require("../middlewares/authMiddleware");

routes.get(
  "/getAll",
  authenticateUserMiddleware,
  shipmentController.getAllShipments,
);

routes.get(
  "/get",
  authenticateUserMiddleware,
  shipmentController.getOneShipment,
);

routes.post("/add", authenticateUserMiddleware, shipmentController.addShipment);

routes.put(
  "/update",
  authenticateUserMiddleware,
  shipmentController.updateShipment,
);

routes.get(
  "/track",
  authenticateUserMiddleware,
  shipmentController.trackShipment,
);

module.exports = routes;
