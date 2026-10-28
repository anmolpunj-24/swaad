const orderRepo = require("../repositories/ordersRepository");
const orderItemRepo = require("../repositories/orderItemsRepository");

const addCustomerOrderService = async (customerUuid, orderData, items) => {
  const checkIfCustomerExist =
    await orderRepo.checkIfCustomerExistInDbRepo(customerUuid);

  if (!checkIfCustomerExist) {
    return {
      success: false,
      errorMessage: "Customer not found!",
    };
  }

  if (!Array.isArray(items) || items.length === 0) {
    return {
      success: false,
      errorMessage: "Order must contain at least one item!",
    };
  }

  const newOrder = await orderRepo.addCustomerOrderRepo(
    customerUuid,
    orderData,
  );

  const orderItemsData = [];

  for (const item of items) {
    const product = await orderItemRepo.checkIfProductExistInDbRepo(
      item.productId,
    );

    if (!product) {
      return {
        success: false,
        errorMessage: "Product not found!",
      };
    }

    const variant = await orderItemRepo.checkIfProductVariantExistInDbRepo(
      item.productVariantId,
      item.productId,
    );

    if (!variant) {
      return {
        success: false,
        errorMessage: "Product variant not found!",
      };
    }

    const quantity = Number(item.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return {
        success: false,
        errorMessage: "Invalid item quantity!",
      };
    }

    orderItemsData.push({
      orderId: newOrder._id,
      productId: product._id,
      productVariantId: variant._id,
      productVariantName: variant.name,
      price: variant.sellingPrice,
      quantity,
      subtotal: variant.sellingPrice * quantity,
    });
  }

  const savedItems =
    await orderItemRepo.addMultipleOrderItemsRepo(orderItemsData);

  return {
    order: newOrder,
    items: savedItems,
  };
};

const getAllCustomerOrdersService = async (customerUuid) => {
  const checkIfCustomerExist =
    await orderRepo.checkIfCustomerExistInDbRepo(customerUuid);

  if (!checkIfCustomerExist) {
    return {
      success: false,
      errorMessage: "Customer not found!",
    };
  }

  const allOrders = await orderRepo.getAllCustomerOrdersRepo(customerUuid);

  return allOrders;
};

const getAllOrdersService = async () => {
  const allOrders = await orderRepo.getAllOrdersRepo();

  return allOrders.map(({ customer, ...order }) => ({
    ...order,
    customerEmail: customer?.userId?.email || null,
  }));
};

const getOneCustomerOrderService = async (customerUuid, orderId) => {
  const checkIfCustomerExist =
    await orderRepo.checkIfCustomerExistInDbRepo(customerUuid);

  if (!checkIfCustomerExist) {
    return {
      success: false,
      errorMessage: "Customer not found!",
    };
  }

  const oneOrderData = await orderRepo.checkIfOrderExistInDbRepo(
    orderId,
    customerUuid,
  );

  if (!oneOrderData) {
    return {
      success: false,
      errorMessage: "No such order found!",
    };
  }

  return oneOrderData;
};

const getOneOrderService = async (orderId) => {
  const oneOrderData =
    await orderRepo.checkIfAvailableOrderExistInDbRepo(orderId);

  if (!oneOrderData) {
    return {
      success: false,
      errorMessage: "No such order found!",
    };
  }

  const { customer, ...order } = oneOrderData.toObject
    ? oneOrderData.toObject()
    : oneOrderData;

  return {
    ...order,
    customerEmail: customer?.userId?.email || null,
  };
};

const updateCustomerOrderService = async (customerUuid, orderId, orderData) => {
  const checkIfCustomerExist =
    await orderRepo.checkIfCustomerExistInDbRepo(customerUuid);

  if (!checkIfCustomerExist) {
    return {
      success: false,
      errorMessage: "Customer not found!",
    };
  }

  const oneOrderData = await orderRepo.checkIfOrderExistInDbRepo(
    orderId,
    customerUuid,
  );

  if (!oneOrderData) {
    return {
      success: false,
      errorMessage: "No such order found!",
    };
  }

  const updatedOrderData = await orderRepo.updateCustomerOrderRepo(
    customerUuid,
    orderId,
    orderData,
  );

  if (!updatedOrderData) {
    return {
      success: false,
      errorMessage: "Order not updated!",
    };
  }

  return updatedOrderData;
};

module.exports = {
  addCustomerOrderService,
  getAllCustomerOrdersService,
  getOneCustomerOrderService,
  updateCustomerOrderService,
  getAllOrdersService,
  getOneOrderService,
};
