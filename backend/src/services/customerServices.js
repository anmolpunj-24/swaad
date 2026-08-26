const customerRepo = require("../repositories/customerRepository");

const getAllCustomersService = async () => {
  const allCustomers = await customerRepo.getAllCustomersRepo();
  return allCustomers;
};

const getOneCustomerService = async (id) => {
  const customerData = await customerRepo.getOneCustomerRepo(id);

  return customerData;
};

const updateCustomerService = async (id, customerData) => {
  const updatedCustomer = await customerRepo.updateCustomerRepo(
    id,
    customerData,
  );

  return updatedCustomer;
};

const deleteCustomerService = async (id) => {
  const deletedUser = await customerRepo.deleteCustomerRepo(id);
  return deletedUser;
};

module.exports = {
  getAllCustomersService,
  getOneCustomerService,
  updateCustomerService,
  deleteCustomerService,
};
