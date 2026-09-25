const Razorpay = require("razorpay");
const crypto = require("crypto");

const orderRepo = require("../repositories/ordersRepository");
const paymentRepo = require("../repositories/paymentsRepository");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createPaymentService = async (customerUuid, orderId) => {
  const order = await orderRepo.checkIfOrderExistInDbRepo(
    orderId,
    customerUuid,
  );

  if (!order) {
    return {
      success: false,
      errorMessage: "No such order found!",
    };
  }

  if (order.paymentStatus === "paid") {
    return {
      success: false,
      errorMessage: "Order has already been paid!",
    };
  }

  const amountInSubunits = Math.round(order.totalAmount * 100);

  const razorpayOrder = await razorpay.orders.create({
    amount: amountInSubunits,
    currency: order.currency,
    receipt: order._id.toString(),
    partial_payment: false,
  });

  const paymentData = {
    orderId: order._id,
    customerUuid: order.customerUuid,
    provider: "razorpay",
    providerOrderId: razorpayOrder.id,
    amount: order.totalAmount,
    currency: order.currency,
    status: "pending",
  };

  const payment = await paymentRepo.addPaymentRepo(paymentData);

  return {
    payment,
    razorpayOrder,
  };
};

const verifyPaymentService = async (
  customerUuid,
  paymentId,
  razorpayPaymentId,
  razorpaySignature,
) => {
  const payment = await paymentRepo.getOnePaymentRepo(paymentId, customerUuid);

  if (!payment) {
    return {
      success: false,
      errorMessage: "Payment not found!",
    };
  }

  if (payment.customerUuid !== customerUuid) {
    return {
      success: false,
      errorMessage: "Payment does not belong to this customer!",
    };
  }

  if (payment.status === "paid") {
    return {
      success: false,
      errorMessage: "Payment has already been verified!",
    };
  }

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${payment.providerOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  const isSignatureValid = crypto.timingSafeEqual(
    Buffer.from(generatedSignature),
    Buffer.from(razorpaySignature),
  );

  if (!isSignatureValid) {
    return {
      success: false,
      errorMessage: "Invalid payment signature!",
    };
  }

  const razorpayPayment = await razorpay.payments.fetch(razorpayPaymentId);

  if (razorpayPayment.order_id !== payment.providerOrderId) {
    return {
      success: false,
      errorMessage: "Payment does not belong to this order!",
    };
  }

  const expectedAmount = Math.round(payment.amount * 100);

  if (razorpayPayment.amount !== expectedAmount) {
    return {
      success: false,
      errorMessage: "Payment amount does not match order amount!",
    };
  }

  if (razorpayPayment.currency !== payment.currency) {
    return {
      success: false,
      errorMessage: "Payment currency does not match order currency!",
    };
  }

  if (razorpayPayment.status !== "captured") {
    return {
      success: false,
      errorMessage: "Payment has not been captured!",
    };
  }

  const updatedPayment = await paymentRepo.updatePaymentRepo(
    paymentId,
    payment.orderId,
    {
      providerPaymentId: razorpayPayment.id,
      paymentMethod: razorpayPayment.method,
      status: "paid",
    },
  );

  if (!updatedPayment) {
    return {
      success: false,
      errorMessage: "Payment could not be updated!",
    };
  }

  const updatedOrder = await orderRepo.updateCustomerOrderRepo(
    customerUuid,
    payment.orderId,
    {
      paymentStatus: "paid",
    },
  );

  if (!updatedOrder) {
    return {
      success: false,
      errorMessage: "Order payment status could not be updated!",
    };
  }

  return {
    payment: updatedPayment,
    order: updatedOrder,
  };
};

module.exports = {
  createPaymentService,
  verifyPaymentService,
};
