const customerAddressRepo = require("../repositories/customerAddressRepository");

const getAllCustomerAddressesService = async (customerUuid) => {
  const allCustomerAddress =
    await customerAddressRepo.getAllCustomerAddressesRepo(customerUuid);
  return allCustomerAddress;
};

const getOneCustomerAddressService = async (customerUuid, addressId) => {
  const oneCustomerAddress =
    await customerAddressRepo.getOneCustomerAddressRepo(
      customerUuid,
      addressId,
    );
  return oneCustomerAddress;
};

const addCustomerAddressService = async (customerAddressData, customerUuid) => {
  const customerAddresses =
    await customerAddressRepo.findCustomerAddressesRepo(customerUuid);

  if (customerAddresses.length >= 5) {
    return {
      success: false,
      errorMessage:
        "Address limit reached. You can only save up to 5 addresses!",
    };
  }

  const isDefault = customerAddresses.length === 0;

  const savedAddress = await customerAddressRepo.addCustomerAddressRepo(
    customerUuid,
    customerAddressData,
    isDefault,
  );

  return savedAddress;
};

const updateCustomerAddressService = async (customerUuid, addressId, body) => {
  const existingAddress = await customerAddressRepo.getOneCustomerAddressRepo(
    customerUuid,
    addressId,
  );

  if (!existingAddress) {
    return null;
  }

  if (body.isDefault === true) {
    await customerAddressRepo.removeDefaultAddressRepo(customerUuid);
  }

  const updatedCustomerAddress =
    await customerAddressRepo.updatedCustomerAddressRepo(
      customerUuid,
      addressId,
      body,
    );

  return updatedCustomerAddress;
};

const deleteCustomerAddressService = async (customerUuid, addressId) => {
  const addressToDelete = await customerAddressRepo.findTheAddressToDelete(
    customerUuid,
    addressId,
  );

  if (!addressToDelete) {
    return null;
  }

  await customerAddressRepo.deleteCustomerAddressRepo(customerUuid, addressId);

  if (addressToDelete.isDefault === true) {
    const mostRecentAddress =
      await customerAddressRepo.findMostRecentAddress(customerUuid);

    if (mostRecentAddress) {
      await customerAddressRepo.makeAddressDefault(
        customerUuid,
        mostRecentAddress._id,
      );
    }
  }
  return true;
};

module.exports = {
  getAllCustomerAddressesService,
  getOneCustomerAddressService,
  addCustomerAddressService,
  updateCustomerAddressService,
  deleteCustomerAddressService,
};
