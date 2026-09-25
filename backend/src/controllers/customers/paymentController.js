const paymentService = require("../../services/paymentServices");

const createPaymentController = async (req, res) => {
  const customerUuid = req.params.customerUuid;
  const orderId = req.params.orderId;

  const paymentData = await paymentService.createPaymentService(
    customerUuid,
    orderId,
  );

  if (paymentData.success === false) {
    return res.status(400).json({
      message: paymentData.errorMessage,
    });
  }

  return res.status(201).json({
    message: "Payment created!",
    payment: paymentData,
  });
};

const verifyPaymentController = async (req, res) => {
  const customerUuid = req.params.customerUuid;
  const paymentId = req.params.paymentId;

  const { razorpayPaymentId, razorpaySignature } = req.body;

  const verifiedPayment = await paymentService.verifyPaymentService(
    customerUuid,
    paymentId,
    razorpayPaymentId,
    razorpaySignature,
  );

  if (verifiedPayment.success === false) {
    return res.status(400).json({
      message: verifiedPayment.errorMessage,
    });
  }

  return res.status(200).json({
    message: "Payment verified successfully!",
    payment: verifiedPayment.payment,
    order: verifiedPayment.order,
  });
};

module.exports = {
  createPaymentController,
  verifyPaymentController,
};
