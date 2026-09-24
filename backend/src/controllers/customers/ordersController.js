const orderService = require("../../services/ordersServices");

const addOrderController = async (req, res) => {
  const customerUuid = req.params.customerUuid;
  const body = req.body;

  const addOrderData = await orderService.addOrderService(customerUuid, body);

  if (addOrderData.success === false) {
    return res.status(400).json({ message: addOrderData.errorMessage });
  }

  return res
    .status(201)
    .json({ message: "Order created!", order: addOrderData });
};

const getAllOrdersController = async (req, res) => {
  const customerUuid = req.params.customerUuid;

  const allOrders = await orderService.getAllOrdersService(customerUuid);

  if (allOrders.success === false) {
    return res.status(400).json({ message: allOrders.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "All orders fetched!", orders: allOrders });
};

const getOneOrderController = async (req, res) => {
  const customerUuid = req.params.customerUuid;
  const orderId = req.params.id;

  const oneCustomerOrder = await orderService.getOneOrderService(
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

const updateOrderController = async (req, res) => {
  const customerUuid = req.params.customerUuid;
  const orderId = req.params.id;
  const body = req.body;

  const updatedOrder = await orderService.updateOrderService(
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
  addOrderController,
  getAllOrdersController,
  getOneOrderController,
  updateOrderController,
};
