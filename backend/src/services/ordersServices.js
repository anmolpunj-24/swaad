const orderRepo = require("../repositories/ordersRepository");

const addCustomerOrderService = async (customerUuid, orderData) => {
  const checkIfCustomerExist =
    await orderRepo.checkIfCustomerExistInDbRepo(customerUuid);

  if (!checkIfCustomerExist) {
    return {
      success: false,
      errorMessage: "Customer not found!",
    };
  }

  const newOrder = await orderRepo.addCustomerOrderRepo(
    customerUuid,
    orderData,
  );
  return newOrder;
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

  return allOrders;
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

  return oneOrderData;
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
