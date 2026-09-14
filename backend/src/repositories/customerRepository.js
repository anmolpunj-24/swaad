const customerModel = require("../models/customers");

const getAllCustomersRepo = async () => {
  return await customerModel
    .find({ deletedAt: null })
    .select("-_id gender dob phone isActive uuid createdAt")
    .sort({ createdAt: -1 })
    .lean();
};

const getOneCustomerRepo = async (uuid) => {
  return await customerModel
    .findOne({
      uuid,
      deletedAt: null,
    })
    .select("-_id gender dob phone isActive uuid")
    .lean();
};

const updateCustomerRepo = async (uuid, customerData) => {
  return await customerModel.findOneAndUpdate(
    { uuid, deletedAt: null },
    customerData,
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
};

const deleteCustomerRepo = async (uuid) => {
  return await customerModel.findOneAndUpdate(
    { uuid, deletedAt: null },
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
