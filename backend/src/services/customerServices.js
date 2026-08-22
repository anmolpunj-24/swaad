const customerModel = require("../models/customers");

const getAllCustomersService = async () => {
  const allCustomers = await customerModel.find();

  return allCustomers;
};

const getOneCustomerService = async (id) => {
  const customerData = await customerModel.findById(id);

  return customerData;
};

const updateCustomerService = async (id, customerData) => {
  const updatedCustomer = await customerModel.findByIdAndUpdate(
    id,
    customerData,
    { returnDocument: "after", runValidators: true },
  );

  return updatedCustomer;
};

const deleteCustomerService = async (id) => {
  const deletedUser = await customerModel.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true },
  );
  
  return deletedUser;
};

module.exports = {
  getAllCustomersService,
  getOneCustomerService,
  updateCustomerService,
  deleteCustomerService,
};
