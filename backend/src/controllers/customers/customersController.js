const customerService = require("../../services/customerServices");

const getAllCustomers = async (req, res) => {
  const allCustomers = await customerService.getAllCustomersService();

  return res
    .status(200)
    .json({ message: "All customers fetched!", customers: allCustomers });
};

const getOneCustomer = async (req, res) => {
  const customerId = req.params.uuid;

  const customerData = await customerService.getOneCustomerService(customerId);

  return res
    .status(200)
    .json({ message: "Customer fetched!", customer: customerData });
};

const updateCustomer = async (req, res) => {
  const customerId = req.params.uuid;

  if (!customerId) {
    return res.status(401).json({ message: "Customer id not found!" });
  }

  const updatedCustomer = await customerService.updateCustomerService(
    customerId,
    req.body,
  );

  return res
    .status(200)
    .json({ message: "Customer updated!", customer: updatedCustomer });
};

const deleteCustomer = async (req, res) => {
  const customerId = req.params.uuid;

  if (!customerId) {
    return res.status(401).json({ message: "Customer id not found!" });
  }

  const deletedCustomer =
    await customerService.deleteCustomerService(customerId);

  return res
    .status(200)
    .json({ message: "Customer deleted!", customer: deletedCustomer });
};

module.exports = {
  getAllCustomers,
  getOneCustomer,
  updateCustomer,
  deleteCustomer,
};
