const orderItemService = require("../../services/orderItemsServices");

const addOrderItemController = async (req, res) => {
  const orderId = req.params.orderId;
  const body = req.body;

  const addOrderItemData = await orderItemService.addOrderItemService(
    orderId,
    body,
  );

  if (addOrderItemData.success === false) {
    return res.status(400).json({ message: addOrderItemData.errorMessage });
  }

  return res
    .status(201)
    .json({ message: "Order item created!", orderItem: addOrderItemData });
};

const getAllOrderItemsController = async (req, res) => {
  const orderId = req.params.orderId;

  const allOrderItems = await orderItemService.getAllOrderItemsService(orderId);

  if (allOrderItems.success === false) {
    return res.status(400).json({ message: allOrderItems.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "All order items fetched!", orderItems: allOrderItems });
};

const getOneOrderItemController = async (req, res) => {
  const orderId = req.params.orderId;
  const orderItemId = req.params.id;

  const oneOrderItemData = await orderItemService.getOneOrderItemService(
    orderId,
    orderItemId,
  );

  if (oneOrderItemData.success === false) {
    return res.status(400).json({ message: oneOrderItemData.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Order item fetched!", orderItem: oneOrderItemData });
};

const updateOrderItemController = async (req, res) => {
  const orderId = req.params.orderId;
  const orderItemId = req.params.id;
  const body = req.body;

  const updatedOrderItem = await orderItemService.updateOrderItemService(
    orderId,
    orderItemId,
    body,
  );

  if (updatedOrderItem.success === false) {
    return res.status(400).json({ message: updatedOrderItem.errorMessage });
  }

  return res
    .status(200)
    .json({ message: "Order item updated!", orderItem: updatedOrderItem });
};

module.exports = {
  addOrderItemController,
  getAllOrderItemsController,
  getOneOrderItemController,
  updateOrderItemController,
};
