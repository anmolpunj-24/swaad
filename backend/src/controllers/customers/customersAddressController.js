const customerAddressService = require("../../services/customerAddressServices");

const addCustomerAddress = async (req, res) => {
  const body = req.body;
  const customerUuid = req.params.uuid;

  const customerAddressData =
    await customerAddressService.addCustomerAddressService(body, customerUuid);

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

const getAllCustomerAddresses = async (req, res) => {
  const customerUuid = req.params.uuid;

  const allCustomerAddress =
    await customerAddressService.getAllCustomerAddressesService(customerUuid);

  return res.status(200).json({
    message: "All customers address fetched!",
    customerAddresses: allCustomerAddress,
  });
};

const getOneCustomerAddress = async (req, res) => {
  const customerUuid = req.params.uuid;
  const addressId = req.params.id;

  const customerAddressData =
    await customerAddressService.getOneCustomerAddressService(
      customerUuid,
      addressId,
    );

  return res.status(200).json({
    message: "Customer address fetched!",
    customerAddress: customerAddressData,
  });
};

const updateCustomerAddress = async (req, res) => {
  const customerUuid = req.params.uuid;
  const addressId = req.params.id;
  const body = req.body;

  const updatedCustomerAddress =
    await customerAddressService.updateCustomerAddressService(
      customerUuid,
      addressId,
      body,
    );

  return res.status(200).json({
    message: "Address updated successfully!",
    customerAddress: updatedCustomerAddress,
  });
};

const deleteCustomerAddress = async (req, res) => {
  const customerUuid = req.params.uuid;
  const addressId = req.params.id;

  await customerAddressService.deleteCustomerAddressService(
    customerUuid,
    addressId,
  );

  return res.status(200).json({
    message: "Address deleted successfully!",
  });
};

module.exports = {
  getAllCustomerAddresses,
  getOneCustomerAddress,
  addCustomerAddress,
  updateCustomerAddress,
  deleteCustomerAddress,
};
