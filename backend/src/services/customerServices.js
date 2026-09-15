const customerRepo = require("../repositories/customerRepository");

const getAllCustomersService = async () => {
  const allCustomers = await customerRepo.getAllCustomersRepo();
  return allCustomers.map((customer) => ({
    name: customer?.userId.name,
    email: customer?.userId?.email,
    profile: customer?.userId?.profile,
    gender: customer?.gender,
    dob: customer?.dob, 
    phone: customer?.phone,
    isActive: customer?.isActive ?? false,
    uuid: customer?.uuid,
    createdAt: customer?.createdAt,
  }));
};

const getOneCustomerService = async (uuid) => {
  const customerData = await customerRepo.getOneCustomerRepo(uuid);
  return {
    name: customerData?.userId.name,
    email: customerData?.userId?.email,
    profile: customerData?.userId?.profile,
    gender: customerData?.gender,
    dob: customerData?.dob,
    phone: customerData?.phone,
    isActive: customerData?.isActive ?? false,
    uuid: customerData?.uuid,
    createdAt: customerData?.createdAt,
    addresses: customerData?.addresses,
  };
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
