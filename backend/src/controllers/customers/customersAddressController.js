const customerAddressService = require("../../services/customerAddressServices");

const getAllCustomersAddress = async (req, res) => {
  const allCustomerAddress =
    await customerAddressService.getAllCustomersAddressService();

  return res.status(200).json({
    message: "All customers address fetched!",
    customersAddress: allCustomerAddress,
  });
};

const getOneCustomerAddress = async (req, res) => {
  const customerId = req.user._id;

  const customerData =
    await customerAddressService.getOneCustomerAddressService(customerId);

  return res
    .status(200)
    .json({ message: "Customer address fetched!", customer: customerData });
};

const addCustomerAddress = async (req, res) => {
  const body = req.body;
  const userId = req.user._id;

  const customerAddressData =
    await customerAddressService.addCustomerAddressService(body, userId);

  if (customerAddressData.success === false) {
    return res.status(400).json({
      message: customerAddressData.errorMessage,
    });
  }

  return res.status(201).json({
    message: "Address added succesfully!",
    customerAddress: customerAddressData,
  });
};

const updateCustomerAddress = async (req, res) => {
  const customerId = req.user._id;
  const addressId = req.params.id;
  const body = req.body;

  if (!customerId) {
    return res.status(400).json({ message: "Customer not found!" });
  }

  if (!addressId) {
    return res.status(400).json({ message: "No such address found!" });
  }

  const updatedCustomer =
    await customerAddressService.updateCustomerAddressService(
      customerId,
      addressId,
      body,
    );

  return res.status(200).json({
    message: "Address updated successfully!",
    customer: updatedCustomer,
  });
};

const deleteCustomerAddress = async (req, res) => {
  const customerId = req.user._id;
  const addressId = req.params.id;

  if (!customerId) {
    return res.status(400).json({ message: "Customer not found!" });
  }

  if (!addressId) {
    return res.status(400).json({ message: "No such address found!" });
  }

  const deletedCustomer =
    await customerAddressService.deleteCustomerAddressService(
      customerId,
      addressId,
    );

  return res.status(200).json({
    message: "Address deleted successfully!",
    customer: deletedCustomer,
  });
};

module.exports = {
  getAllCustomersAddress,
  getOneCustomerAddress,
  addCustomerAddress,
  updateCustomerAddress,
  deleteCustomerAddress,
};
