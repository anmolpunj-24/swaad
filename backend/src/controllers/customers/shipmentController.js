const shipmentService = require("../../services/shipmentServices");

const addShipment = async (req, res) => {
  const orderId = req.params.orderId;
  const body = req.body;

  const addShipmentData = await shipmentService.addShipmentService(
    orderId,
    body,
  );

  if (addShipmentData.success === false) {
    return res.status(400).json({ message: addShipmentData.errorMessage });
  }

  return res
    .status(201)
    .json({ message: "Shipment created!", shipment: addShipmentData });
};

const getOneShipment = async (req, res) => {
  const orderId = req.params.orderId;

  const oneShipmentData = await shipmentService.getOneShipmentService(orderId);

  if (oneShipmentData.success === false) {
    return res.status(400).json({ message: oneShipmentData.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Shipment fetched!", shipment: oneShipmentData });
};

const updateShipment = async (req, res) => {
  const orderId = req.params.orderId;
  const body = req.body;

  const updatedShipment = await shipmentService.updateShipmentService(
    orderId,
    body,
  );

  if (updatedShipment.success === false) {
    return res.status(400).json({ message: updatedShipment.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Shipment updated!", shipment: updatedShipment });
};

const trackShipment = async (req, res) => {
  const orderId = req.params.orderId;

  const oneShipmentTracking =
    await shipmentService.trackShipmentService(orderId);

  if (oneShipmentTracking.success === false) {
    return res.status(400).json({ message: oneShipmentTracking.errorMessage });
  }

  return res
    .status(200)
    .json({
      message: "Shipment tracking fetched!",
      shipment: oneShipmentTracking,
    });
};

module.exports = {
  addShipment,
  getOneShipment,
  updateShipment,
  trackShipment,
};
