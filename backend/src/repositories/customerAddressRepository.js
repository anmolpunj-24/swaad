const customerAddressModel = require("../models/customer_address");

const getAllCustomerAddressesRepo = async (customerUuid) => {
  return await customerAddressModel
    .find({ customerUuid })
    .select(
      "addressLine_1 addressLine_2 country state postalCode city isDefault createdAt",
    )
    .sort({ createdAt: -1 })
    .lean();
};

const getOneCustomerAddressRepo = async (customerUuid, addressId) => {
  return await customerAddressModel
    .findOne({
      _id: addressId,
      customerUuid,
    })
    .select(
      "addressLine_1 addressLine_2 country state postalCode city isDefault createdAt",
    )
    .lean();
};

const findCustomerAddressesRepo = async (customerUuid) => {
  return await customerAddressModel
    .find({ customerUuid })
    .select("_id isDefault")
    .lean();
};

const removeDefaultAddressRepo = async (customerUuid) => {
  return await customerAddressModel.updateMany(
    {
      customerUuid,
      isDefault: true,
    },
    {
      $set: {
        isDefault: false,
      },
    },
  );
};

const addCustomerAddressRepo = async (
  customerUuid,
  customerAddressData,
  isDefault,
) => {
  const newAddress = new customerAddressModel({
    customerUuid,
    ...customerAddressData,
    isDefault,
  });

  const savedAddress = await newAddress.save();

  return savedAddress;
};

const updatedCustomerAddressRepo = async (
  customerUuid,
  addressId,
  customerAddressData,
) => {
  return await customerAddressModel.findOneAndUpdate(
    {
      _id: addressId,
      customerUuid,
    },
    {
      $set: {
        ...customerAddressData,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
};

const findTheAddressToDelete = async (customerUuid, addressId) => {
  return await customerAddressModel.findOne({
    _id: addressId,
    customerUuid,
  });
};

const deleteCustomerAddressRepo = async (customerUuid, addressId) => {
  return await customerAddressModel.findOneAndDelete({
    _id: addressId,
    customerUuid,
  });
};

const findMostRecentAddress = async (customerUuid) => {
  return await customerAddressModel
    .findOne({ customerUuid })
    .sort({ createdAt: -1 });
};

const makeAddressDefault = async (customerUuid, addressId) => {
  return await customerAddressModel.findOneAndUpdate(
    {
      _id: addressId,
      customerUuid,
    },
    {
      $set: {
        isDefault: true,
      },
    },
    {
      new: true,
    },
  );
};

module.exports = {
  getAllCustomerAddressesRepo,
  getOneCustomerAddressRepo,
  findCustomerAddressesRepo,
  removeDefaultAddressRepo,
  addCustomerAddressRepo,
  updatedCustomerAddressRepo,
  findTheAddressToDelete,
  deleteCustomerAddressRepo,
  findMostRecentAddress,
  makeAddressDefault,
};
