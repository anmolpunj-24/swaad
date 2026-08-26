const customerAddressRepo = require("../repositories/customerAddressRepository");

const getAllCustomersAddressService = async () => {
  const allCustomerAddress =
    await customerAddressRepo.getAllCustomersAddressRepo();

  return allCustomerAddress;
};

const getOneCustomerAddressService = async (id) => {
  const oneCustomerAddress =
    await customerAddressRepo.getOneCustomersAddressRepo(id);

  return oneCustomerAddress;
};

const addCustomerAddressService = async (customerAddressData, customerId) => {
  const customerAddressFromDb =
    await customerAddressRepo.findCustomerAddressFromDb(customerId);

  if (customerAddressFromDb.length >= 5) {
    return {
      success: false,
      errorMessage:
        "Address limit reached. You can only save up to 5 addresses!",
    };
  }

  let isDefault = false;

  if (customerAddressFromDb.length === 0) {
    isDefault = true;
  } else {
    const oldDefaultAddress = customerAddressFromDb.find(
      (addr) => addr.isDefault === true,
    );

    if (oldDefaultAddress) {
      await customerAddressRepo.updateDefaultToFalse(oldDefaultAddress._id);
    }
  }

  const savedAddress = await customerAddressRepo.addCustomerAddressRepo(
    customerId,
    customerAddressData,
    isDefault,
  );

  return savedAddress;
};

const updateCustomerAddressService = async (customerId, addressId, body) => {
  await customerAddressRepo.checkIfThereIsAnAdressWithDefaultTrue(customerId);

  const updatedCustomerAddress =
    await customerAddressRepo.updatedCustomerAddressRepo(
      customerId,
      addressId,
      body,
    );

  return updatedCustomerAddress;
};

const deleteCustomerAddressService = async (customerId, addressId) => {
  const addressToDelete = await customerAddressRepo.findTheAddressToDelete(
    addressId,
    customerId,
  );

  if (!addressToDelete) {
    return null;
  }

  await customerAddressRepo.deleteCustomerAddressRepo(addressId);

  if (addressToDelete.isDefault === true) {
    const mostRecentAddress =
      await customerAddressRepo.findMostRecentAddress(customerId);

    if (mostRecentAddress) {
      await customerAddressRepo.makeAddressDefault(mostRecentAddress);
    }
  }
  return true;
};

module.exports = {
  getAllCustomersAddressService,
  getOneCustomerAddressService,
  addCustomerAddressService,
  updateCustomerAddressService,
  deleteCustomerAddressService,
};
