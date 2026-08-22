const customerAddressModel = require("../models/customer_address");

const getAllCustomersAddressService = async () => {
  const allCustomerAddress = await customerAddressModel.find();

  return allCustomerAddress;
};

const getOneCustomerAddressService = async (id) => {
  const oneCustomerAddress = await customerAddressModel.find({ userId: id });

  return oneCustomerAddress;
};

const addCustomerAddressService = async (customerAddressData, customerId) => {
  const customerAddressFromDb = await customerAddressModel.find({
    userId: customerId,
  });

  if (customerAddressFromDb.length >= 5) {
    throw new Error(
      "Address limit reached. You can only save up to 5 addresses!",
    );
  }

  let isDefault = false;

  if (customerAddressFromDb.length === 0) {
    isDefault = true;
  } else {
    const oldDefaultAddress = customerAddressFromDb.find(
      (addr) => addr.isDefault === true,
    );

    if (oldDefaultAddress) {
      await customerAddressModel.updateOne(
        { _id: oldDefaultAddress._id },
        { $set: { isDefault: false } },
      );
    }
  }

  const newAddress = new customerAddressModel({
    userId: customerId,
    ...customerAddressData,
    isDefault,
  });

  const savedAddress = await newAddress.save();

  return savedAddress;
};

const updateCustomerAddressService = async (customerId, addressId, body) => {
  const findAddressWithDefaultTrue =
    await customerAddressModel.findOneAndUpdate(
      { userId: customerId },
      { $set: { isDefault: false } },
      { new: true },
    );

  const updatedCustomerAddress = await customerAddressModel.findOneAndUpdate(
    { _id: addressId, userId: customerId },
    {
      $set: {
        ...body,
        isDefault: true,
      },
    },
    { new: true },
  );

  return updatedCustomerAddress;
};

const deleteCustomerAddressService = async (customerId, addressId) => {
  const addressToDelete = await customerAddressModel.findOne({
    _id: addressId,
    userId: customerId,
  });

  if (!addressToDelete) {
    return null;
  }

  await customerAddressModel.deleteOne({ _id: addressId });

  if (addressToDelete.isDefault === true) {
    const mostRecentAddress = await customerAddressModel
      .findOne({ userId: customerId })
      .sort({ createdAt: -1 });

    if (mostRecentAddress) {
      mostRecentAddress.isDefault = true;
      await mostRecentAddress.save();
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
