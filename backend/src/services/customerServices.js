const customerRepo = require("../repositories/customerRepository");

const getAllCustomersService = async () => {
  const allCustomers = await customerRepo.getAllCustomersRepo();
  return allCustomers;
};

const getOneCustomerService = async (uuid) => {
  const customerData = await customerRepo.getOneCustomerRepo(uuid);

  return customerData;
};

const updateCustomerService = async (uuid, customerData) => {
  const updatedCustomer = await customerRepo.updateCustomerRepo(
    uuid,
    customerData,
  );

  return updatedCustomer;
};

const deleteCustomerService = async (uuid) => {
  const deletedUser = await customerRepo.deleteCustomerRepo(uuid);
  return deletedUser;
};

module.exports = {
  getAllCustomersService,
  getOneCustomerService,
  updateCustomerService,
  deleteCustomerService,
};
