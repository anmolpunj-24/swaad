const orderService = require("../../services/ordersServices");

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

module.exports = {
  addCustomerOrderController,
  getAllCustomerOrdersController,
  getOneCustomerOrderController,
  updateCustomerOrderController,
  getAllOrdersController,
  getOneOrderController,
};
