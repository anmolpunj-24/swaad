const orderItemRepo = require("../repositories/orderItemsRepository");

const addOrderItemService = async (orderId, orderItemData) => {
  const checkIfOrderExist =
    await orderItemRepo.checkIfOrderExistInDbRepo(orderId);

  if (!checkIfOrderExist) {
    return {
      success: false,
      errorMessage: "No order found!",
    };
  }

  const checkIfProductExist = await orderItemRepo.checkIfProductExistInDbRepo(
    orderItemData.productId,
  );

  if (!checkIfProductExist) {
    return {
      success: false,
      errorMessage: "Product not found!",
    };
  }

  if (!orderItemData.productVariantId) {
    return {
      success: false,
      errorMessage: "Product variant is required!",
    };
  }

  const productVariant = await orderItemRepo.checkIfProductVariantExistInDbRepo(
    orderItemData.productVariantId,
    orderItemData.productId,
  );

  if (!productVariant) {
    return {
      success: false,
      errorMessage: "Product variant not found!",
    };
  }

  const unitPrice = productVariant.sellingPrice;
  const subtotal = unitPrice * orderItemData.quantity;

  const newOrderItemData = {
    orderId,
    productId: checkIfProductExist._id,
    productVariantId: productVariant._id,
    variantName: productVariant ? productVariant.name : null,
    unitPrice,
    quantity: orderItemData.quantity,
    subtotal,
  };

  const newOrderItem =
    await orderItemRepo.addCustomerOrderItemRepo(newOrderItemData);

  return newOrderItem;
};

const getAllOrderItemsService = async (orderId) => {
  const checkIfOrderExist =
    await orderItemRepo.checkIfOrderExistInDbRepo(orderId);

  if (!checkIfOrderExist) {
    return { success: false, errorMessage: "No order found!" };
  }

  const allOrderItems =
    await orderItemRepo.getAllCustomerOrderItemsRepo(orderId);

  return allOrderItems;
};

const getOneOrderItemService = async (orderId, orderItemId) => {
  const checkIfOrderExist =
    await orderItemRepo.checkIfOrderExistInDbRepo(orderId);

  if (!checkIfOrderExist) {
    return { success: false, errorMessage: "No order found!" };
  }

  const oneOrderItem = await orderItemRepo.checkIfOneOrderItemExistInDbRepo(
    orderItemId,
    orderId,
  );

  if (!oneOrderItem) {
    return {
      success: false,
      errorMessage: "No order item found!",
    };
  }

  return oneOrderItem;
};

const updateOrderItemService = async (orderId, orderItemId, orderItemData) => {
  const checkIfOrderExist =
    await orderItemRepo.checkIfOrderExistInDbRepo(orderId);

  if (!checkIfOrderExist) {
    return { success: false, errorMessage: "No order found!" };
  }

  const oneOrderItem = await orderItemRepo.checkIfOneOrderItemExistInDbRepo(
    orderItemId,
    orderId,
  );

  if (!oneOrderItem) {
    return {
      success: false,
      errorMessage: "No order item found!",
    };
  }

  const updatedOrderItem = await orderItemRepo.updateCustomerOrderItemRepo(
    orderItemId,
    orderId,
    orderItemData,
  );
  return updatedOrderItem;
};

module.exports = {
  addOrderItemService,
  getAllOrderItemsService,
  getOneOrderItemService,
  updateOrderItemService,
};
