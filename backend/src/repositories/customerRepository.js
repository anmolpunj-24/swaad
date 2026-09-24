const customerModel = require("../models/customers");
const customerAddressModel = require("../models/customer_address");
const customerOrderModel = require("../models/orders");

const getAllCustomersRepo = async () => {
  return await customerModel
    .find({ deletedAt: null, isActive: true })
    .select("-_id gender dob phone isActive uuid createdAt")
    .sort("-createdAt")
    .populate({
      path: "userId",
      select: "name email profile",
    })
    .lean();
};

const getOneCustomerRepo = async (uuid) => {
  const customer = await customerModel
    .findOne({
      uuid,
      deletedAt: null,
      isActive: true,
    })
    .select("-_id gender dob phone isActive uuid createdAt")
    .populate({
      path: "userId",
      select: "name email profile",
    })
    .lean();

  if (!customer) {
    return null;
  }

  const addresses = await customerAddressModel
    .find({
      customerUuid: uuid,
    })
    .select("-_id -customerUuid")
    .sort("-createdAt")
    .lean();

  const orders = await customerOrderModel
    .find({
      customerUuid: uuid,
    })
    .select("-customerUuid")
    .lean();

  return {
    ...customer,
    addresses,
    orders,
  };
};

const updateCustomerRepo = async (uuid, customerData) => {
  return await customerModel.findOneAndUpdate(
    { uuid, deletedAt: null, isActive: true },
    customerData,
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
};

const deleteCustomerRepo = async (uuid) => {
  return await customerModel.findOneAndUpdate(
    { uuid, deletedAt: null, isActive: true },
    { deletedAt: new Date(), isActive: false },
    { new: true },
  );
};

module.exports = {
  getAllCustomersRepo,
  getOneCustomerRepo,
  updateCustomerRepo,
  deleteCustomerRepo,
};
