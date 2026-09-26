const Razorpay = require("razorpay");
const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");

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

  const razorpayPaymentLink = await razorpay.paymentLink.create({
    amount: amountInSubunits,
    currency: order.currency,
    reference_id: order._id.toString(),
    description: `Payment for order ${order._id}`,
    accept_partial: false,
    customer: {
      name: order.shippingAddress.name,
      contact: order.shippingAddress.phone,
    },
    notify: {
      sms: false,
      email: false,
    },
    reminder_enable: false,

    callback_url: `${process.env.FRONTEND_URL}/payment/success`,
    callback_method: "get",
  });

  const paymentData = {
    orderId: order._id,
    customerUuid: order.customerUuid,
    provider: "razorpay",
    providerLinkId: razorpayPaymentLink.id,
    paymentLink: razorpayPaymentLink.short_url,
    amount: order.totalAmount,
    currency: order.currency,
    status: "pending",
  };

  const payment = await paymentRepo.addPaymentRepo(paymentData);

  return {
    ...payment.toObject(),
    paymentLink: razorpayPaymentLink.short_url,
  };
};

const verifyPaymentService = async (
  customerUuid,
  paymentId,
  razorpayPaymentLinkId,
  razorpayPaymentId,
  razorpayPaymentLinkReferenceId,
  razorpayPaymentLinkStatus,
  razorpaySignature,
) => {
  const payment = await paymentRepo.getOnePaymentRepo(paymentId, customerUuid);

  if (!payment) {
    return {
      success: false,
      errorMessage: "Payment not found!",
    };
  }

  if (payment.status === "paid") {
    return {
      success: false,
      errorMessage: "Payment has already been verified!",
    };
  }

  if (payment.providerLinkId !== razorpayPaymentLinkId) {
    return {
      success: false,
      errorMessage: "Payment link does not belong to this payment!",
    };
  }

  if (payment.orderId.toString() !== razorpayPaymentLinkReferenceId) {
    return {
      success: false,
      errorMessage: "Payment link does not belong to this order!",
    };
  }

  try {
    validatePaymentVerification(
      {
        payment_link_id: razorpayPaymentLinkId,
        payment_id: razorpayPaymentId,
        payment_link_reference_id: razorpayPaymentLinkReferenceId,
        payment_link_status: razorpayPaymentLinkStatus,
      },
      razorpaySignature,
      process.env.RAZORPAY_KEY_SECRET,
    );
  } catch (error) {
    return {
      success: false,
      errorMessage: "Invalid payment signature!",
    };
  }

  if (razorpayPaymentLinkStatus !== "paid") {
    return {
      success: false,
      errorMessage: "Payment link has not been paid!",
    };
  }

  const razorpayPayment = await razorpay.payments.fetch(razorpayPaymentId);

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
