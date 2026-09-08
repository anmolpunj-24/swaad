const customerModel = require("../models/customers");

const getAllCustomersRepo = async () => {
  return await customerModel.find({ deletedAt: null });
};

const getOneCustomerRepo = async (uuid) => {
  return await customerModel.findOne({
    uuid,
    deletedAt: null,
  });
};

const updateCustomerRepo = async (uuid, customerData) => {
  return await customerModel.findOneAndUpdate(
    { uuid, customerData },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
};

const deleteCustomerRepo = async (uuid) => {
  return await customerModel.findOneAndUpdate(
    {
      uuid,
    },
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
