const customerAddressModel = require("../models/customer_address");

const getAllCustomersAddressRepo = async () => {
  return await customerAddressModel.find();
};

const getOneCustomersAddressRepo = async (id) => {
  return await customerAddressModel.find({ userId: id });
};

const findCustomerAddressFromDb = async (customerId) => {
  return await customerAddressModel.find({
    userId: customerId,
  });
};

const updateDefaultToFalse = async (id) => {
  return await customerAddressModel.updateOne(
    { _id: id },
    { $set: { isDefault: false } },
  );
};

const addCustomerAddressRepo = async (
  customerId,
  customerAddressData,
  isDefault,
) => {
  const newAddress = new customerAddressModel({
    userId: customerId,
    ...customerAddressData,
    isDefault,
  });

  const savedAddress = await newAddress.save();

  return savedAddress;
};

const checkIfThereIsAnAdressWithDefaultTrue = async (customerId) => {
  return await customerAddressModel.findOneAndUpdate(
    {
      userId: customerId,
      isDefault: true,
    },
    {
      $set: {
        isDefault: false,
      },
    },
  );
};

const updatedCustomerAddressRepo = async (addressId, customerId, body) => {
  return await customerAddressModel.findOneAndUpdate(
    {
      _id: addressId,
      userId: customerId,
    },
    {
      $set: {
        ...body,
        isDefault: true,
      },
    },
    {
      new: true,
    },
  );
};

const findTheAddressToDelete = async (addressId, customerId) => {
  return await customerAddressModel.findOne({
    _id: addressId,
    userId: customerId,
  });
};

const deleteCustomerAddressRepo = async (addressId) => {
  return await customerAddressModel.deleteOne({ _id: addressId });
};

const findMostRecentAddress = async (customerId) => {
  return await customerAddressModel
    .findOne({ userId: customerId })
    .sort({ createdAt: -1 });
};

const makeAddressDefault = async (address) => {
  address.isDefault = true;
  return await address.save();
};

module.exports = {
  getAllCustomersAddressRepo,
  getOneCustomersAddressRepo,
  findCustomerAddressFromDb,
  updateDefaultToFalse,
  addCustomerAddressRepo,
  checkIfThereIsAnAdressWithDefaultTrue,
  updatedCustomerAddressRepo,
  findTheAddressToDelete,
  deleteCustomerAddressRepo,
  findMostRecentAddress,
  makeAddressDefault,
};
