const customerModel = require("../models/customers");
const ordersModel = require("../models/orders");

const checkIfCustomerExistInDbRepo = async (customerUuid) => {
  return await customerModel.findOne({
    uuid: customerUuid,
    deletedAt: null,
    isActive: true,
  });
};

const addCustomerOrderRepo = async (customerUuid, orderData) => {
  const newOrderData = new ordersModel({ customerUuid, ...orderData });
  const newOrder = await newOrderData.save();
  return newOrder;
};

const getAllCustomerOrdersRepo = async (customerUuid) => {
  return await ordersModel.find({
    customerUuid,
  });
};

const checkIfOrderExistInDbRepo = async (orderId, customerUuid) => {
  return await ordersModel.findOne({
    _id: orderId,
    customerUuid,
  });
};

const updateCustomerOrderRepo = async (customerUuid, orderId, orderData) => {
  return await ordersModel.findOneAndUpdate(
    { customerUuid, _id: orderId },
    { $set: orderData },
    { new: true },
  );
};

module.exports = {
  checkIfCustomerExistInDbRepo,
  addCustomerOrderRepo,
  getAllCustomerOrdersRepo,
  checkIfOrderExistInDbRepo,
  updateCustomerOrderRepo,
};
