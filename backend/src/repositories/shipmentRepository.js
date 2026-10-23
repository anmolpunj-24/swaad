const orderModel = require("../models/orders");

const checkIfOrderExistInDbRepo = async (orderId) => {
  return await orderModel
    .findOne({
      _id: orderId,
    })
    .select(
      "_id status shippingProvider shipmentTrackingId shipmentTrackingUrl",
    )
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
        shipmentTrackingUrl: shipmentData.shipmentTrackingUrl,
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
};

const oneShipmentDataRepo = async (orderId) => {
  return await orderModel
    .findOne({
      _id: orderId,
    })
    .select(
      "_id shippingProvider shipmentTrackingId status shipmentTrackingUrl",
    )
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
        shipmentTrackingUrl: shipmentData?.shipmentTrackingUrl,
        status: shipmentData?.status,
      },
    },
    {
      returnDocument: "after",
    },
  );
};

module.exports = {
  checkIfOrderExistInDbRepo,
  addShipmentRepo,
  oneShipmentDataRepo,
  updateShipmentDataRepo,
};
