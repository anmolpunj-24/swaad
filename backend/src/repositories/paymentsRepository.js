const ordersModel = require("../models/orders");
const paymentModel = require("../models/payments");

const checkIfOrderExistInDbRepo = async (orderId) => {
  return await ordersModel.findOne({
    _id: orderId,
  });
};

const checkIfPaymentExistInDbRepo = async (paymentId, orderId) => {
  return await paymentModel.findOne({
    _id: paymentId,
    orderId,
  });
};

const addPaymentRepo = async (paymentData) => {
  const newPayment = new paymentModel(paymentData);
  const payment = await newPayment.save();

  return payment;
};

const getAllOrderPaymentsRepo = async (orderId) => {
  return await paymentModel.find({
    orderId,
  });
};

const getOnePaymentRepo = async (paymentId, customerUuid) => {
  return await paymentModel.findOne({
    _id: paymentId,
    customerUuid,
  });
};

const updatePaymentRepo = async (paymentId, orderId, paymentData) => {
  return await paymentModel.findOneAndUpdate(
    {
      _id: paymentId,
      orderId,
    },
    {
      $set: paymentData,
    },
    {
      new: true,
    },
  );
};

module.exports = {
  checkIfOrderExistInDbRepo,
  checkIfPaymentExistInDbRepo,
  addPaymentRepo,
  getAllOrderPaymentsRepo,
  getOnePaymentRepo,
  updatePaymentRepo,
};
