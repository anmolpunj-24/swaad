const orderService = require("../../services/ordersServices");
const sendEmailService = require("../../services/mailServices");

const OrderConfirmationTemplate = require("../../utils/emailTemplates/orderConfirmationTemplate");
const OrderShippedTemplate = require("../../utils/emailTemplates/orderShippedTemplate");
const OrderDeliveredTemplate = require("../../utils/emailTemplates/orderDeliveredTemplate");

const addCustomerOrderController = async (req, res) => {
  const customerUuid = req.params.customerUuid;
  const body = req.body;

  const addOrderData = await orderService.addCustomerOrderService(
    customerUuid,
    body,
  );

  if (addOrderData.success === false) {
    return res.status(400).json({ message: addOrderData.errorMessage });
  }

  return res
    .status(201)
    .json({ message: "Order created!", order: addOrderData });
};

const getAllCustomerOrdersController = async (req, res) => {
  const customerUuid = req.params.customerUuid;

  const allOrders =
    await orderService.getAllCustomerOrdersService(customerUuid);

  if (allOrders.success === false) {
    return res.status(400).json({ message: allOrders.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "All orders fetched!", orders: allOrders });
};

const getAllOrdersController = async (req, res) => {
  const allOrders = await orderService.getAllOrdersService();

  if (allOrders.success === false) {
    return res.status(400).json({ message: allOrders.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "All orders fetched!", orders: allOrders });
};

const getOneCustomerOrderController = async (req, res) => {
  const customerUuid = req.params.customerUuid;
  const orderId = req.params.id;

  const oneCustomerOrder = await orderService.getOneCustomerOrderService(
    customerUuid,
    orderId,
  );

  if (oneCustomerOrder.success === false) {
    return res.status(400).json({ message: oneCustomerOrder.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Order fetched!", order: oneCustomerOrder });
};

const getOneOrderController = async (req, res) => {
  const orderId = req.params.id;

  const oneOrderData = await orderService.getOneOrderService(orderId);

  if (oneOrderData.success === false) {
    return res.status(400).json({ message: oneOrderData.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Order fetched!", order: oneOrderData });
};

const updateCustomerOrderController = async (req, res) => {
  const customerUuid = req.params.customerUuid;
  const orderId = req.params.id;
  const body = req.body;

  const updatedOrder = await orderService.updateCustomerOrderService(
    customerUuid,
    orderId,
    body,
  );

  if (updatedOrder.success === false) {
    return res.status(400).json({ message: updatedOrder.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Order updated!", order: updatedOrder });
};

const sendOrderStatusEmail = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const emailConfig = {
      confirmed: {
        subject: "Your SWAAD Order Is Confirmed!",
        template: OrderConfirmationTemplate,
      },
      shipped: {
        subject: "Your SWAAD Order Has Been Shipped!",
        template: OrderShippedTemplate,
      },
      delivered: {
        subject: "Your SWAAD Order Has Been Delivered!",
        template: OrderDeliveredTemplate,
      },
    };

    if (!emailConfig[status]) {
      return res.status(400).json({
        message: "Email is not available for this order status.",
      });
    }

    const order = await orderService.getOneOrderService(id);

    if (!order || order.success === false) {
      return res.status(404).json({
        message: order?.errorMessage || "Order not found.",
      });
    }

    if (order.status !== status) {
      return res.status(400).json({
        message: "The email status does not match the current order status.",
      });
    }

    if (!order.customerEmail) {
      return res.status(400).json({
        message: "Customer email address not found.",
      });
    }

    const { subject, template } = emailConfig[status];

    const emailResult = await sendEmailService({
      to: order.customerEmail,
      subject,
      html: template(order),
    });

    if (!emailResult.success) {
      return res.status(500).json({
        message: "Failed to send order email.",
      });
    }

    return res.status(200).json({
      message: "Order email sent successfully.",
      status,
    });
  } catch (error) {
    console.error("Error sending order status email:", error);

    return res.status(500).json({
      message: "Something went wrong while sending the order email.",
    });
  }
};

module.exports = {
  addCustomerOrderController,
  getAllCustomerOrdersController,
  getOneCustomerOrderController,
  updateCustomerOrderController,
  getAllOrdersController,
  getOneOrderController,
  sendOrderStatusEmail,
};
