const customerModel = require("../models/customers");

const getAllCustomersRepo = async () => {
  return await customerModel.find({ deletedAt: null });
};

const getOneCustomerRepo = async (id) => {
  return await customerModel.findById({
    uuid: id,
    deletedAt: null,
  });
};

const updateCustomerRepo = async (id, customerData) => {
  return await customerModel.findByIdAndUpdate(id, customerData, {
    returnDocument: "after",
    runValidators: true,
  });
};

const deleteCustomerRepo = async (id) => {
  return await customerModel.findByIdAndUpdate(
    id,
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
