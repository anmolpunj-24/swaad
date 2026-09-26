const orderModel = require("../models/orders");

const checkIfOrderExistInDbRepo = async (orderId) => {
  return await orderModel
    .findOne({
      _id: orderId,
    })
    .select("_id status shippingProvider shipmentTrackingId")
    .lean();
};

const addShipmentRepo = async (orderId, shipmentData) => {
  return await orderModel.findOneAndUpdate(
    {
      _id: orderId,
    },
    {
      $set: {
        shippingProvider: shipmentData.shippingProvider,
        shipmentTrackingId: shipmentData.shipmentTrackingId,
      },
    },
    {
      new: true,
    },
  );
};

const oneShipmentDataRepo = async (orderId) => {
  return await orderModel
    .findOne({
      _id: orderId,
    })
    .select("_id shippingProvider shipmentTrackingId status")
    .lean();
};

const updateShipmentDataRepo = async (orderId, shipmentData) => {
  return await orderModel.findOneAndUpdate(
    {
      _id: orderId,
    },
    {
      $set: {
        shippingProvider: shipmentData?.shippingProvider,
        shipmentTrackingId: shipmentData?.shipmentTrackingId,
        status: shipmentData?.status,
      },
    },
    {
      new: true,
    },
  );
};

module.exports = {
  checkIfOrderExistInDbRepo,
  addShipmentRepo,
  oneShipmentDataRepo,
  updateShipmentDataRepo,
};
