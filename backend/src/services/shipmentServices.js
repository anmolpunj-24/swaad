const shipmentRepo = require("../repositories/shipmentRepository");

const addShipmentService = async (orderId, shipmentData) => {
  const checkIfOrderExist =
    await shipmentRepo.checkIfOrderExistInDbRepo(orderId);

  if (!checkIfOrderExist) {
    return {
      success: false,
      errorMessage: "Order not found!",
    };
  }

  if (checkIfOrderExist.status !== "processing") {
    return {
      success: false,
      errorMessage: "Shipment can only be added to a processing order!",
    };
  }

  if (
    checkIfOrderExist.shippingProvider ||
    checkIfOrderExist.shipmentTrackingId
  ) {
    return {
      success: false,
      errorMessage: "Shipment already exists for this order!",
    };
  }

  if (!shipmentData?.shippingProvider) {
    return {
      success: false,
      errorMessage: "Shipping provider is required!",
    };
  }

  if (!shipmentData?.shipmentTrackingId) {
    return {
      success: false,
      errorMessage: "Shipment tracking ID is required!",
    };
  }

  const newShipment = await shipmentRepo.addShipmentRepo(orderId, shipmentData);

  if (!newShipment) {
    return {
      success: false,
      errorMessage: "Failed to add shipment!",
    };
  }

  return newShipment;
};

const getOneShipmentService = async (orderId) => {
  const checkIfOrderExist =
    await shipmentRepo.checkIfOrderExistInDbRepo(orderId);

  if (!checkIfOrderExist) {
    return {
      success: false,
      errorMessage: "Order not found!",
    };
  }

  if (
    !checkIfOrderExist.shippingProvider ||
    !checkIfOrderExist.shipmentTrackingId
  ) {
    return {
      success: false,
      errorMessage: "Shipment details not found!",
    };
  }

  const oneShipment = await shipmentRepo.oneShipmentDataRepo(orderId);

  if (!oneShipment) {
    return {
      success: false,
      errorMessage: "Shipment details not found!",
    };
  }

  return oneShipment;
};

const updateShipmentService = async (orderId, shipmentData) => {
  const checkIfOrderExist =
    await shipmentRepo.checkIfOrderExistInDbRepo(orderId);

  if (!checkIfOrderExist) {
    return {
      success: false,
      errorMessage: "Order not found!",
    };
  }

  if (
    !checkIfOrderExist.shippingProvider ||
    !checkIfOrderExist.shipmentTrackingId
  ) {
    return {
      success: false,
      errorMessage: "Shipment details not found!",
    };
  }

  const currentStatus = checkIfOrderExist.status;
  const newStatus = shipmentData?.status;

  if (!newStatus) {
    return {
      success: false,
      errorMessage: "Shipment status is required!",
    };
  }

  const allowedStatusTransitions = {
    processing: ["shipped"],
    shipped: ["delivered"],
  };

  if (
    !allowedStatusTransitions[currentStatus] ||
    !allowedStatusTransitions[currentStatus].includes(newStatus)
  ) {
    return {
      success: false,
      errorMessage: `Invalid shipment status transition from ${currentStatus} to ${newStatus}!`,
    };
  }

  const updatedShipmentData = await shipmentRepo.updateShipmentDataRepo(
    orderId,
    shipmentData,
  );

  if (!updatedShipmentData) {
    return {
      success: false,
      errorMessage: "Failed to update shipment!",
    };
  }

  return updatedShipmentData;
};

const trackShipmentService = async (orderId) => {
  const checkIfOrderExist =
    await shipmentRepo.checkIfOrderExistInDbRepo(orderId);

  if (!checkIfOrderExist) {
    return {
      success: false,
      errorMessage: "Order not found!",
    };
  }

  if (
    !checkIfOrderExist.shippingProvider ||
    !checkIfOrderExist.shipmentTrackingId
  ) {
    return {
      success: false,
      errorMessage: "Shipment details not found!",
    };
  }

  return {
    shippingProvider: checkIfOrderExist.shippingProvider,
    shipmentTrackingId: checkIfOrderExist.shipmentTrackingId,
    status: checkIfOrderExist.status,
  };
};

module.exports = {
  addShipmentService,
  getOneShipmentService,
  updateShipmentService,
  trackShipmentService,
};
