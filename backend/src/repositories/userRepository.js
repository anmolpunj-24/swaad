const userModel = require("../models/users");
const customerModel = require("../models/customers");

const addUserRepo = async (userData) => {
  const newUser = new userModel(userData);
  const savedUser = await newUser.save();
  return savedUser;
};

const addCustomerRepo = async (customerData) => {
  const newCustomer = new customerModel(customerData);
  const savedCustomer = await newCustomer.save();
  return savedCustomer;
};

const getAllUsersRepo = async () => {
  return await userModel.find();
};

const getOneUserRepo = async (id) => {
  return await userModel.findById(id);
};

const updateUserRepo = async (id, userData) => {
  return await userModel.findByIdAndUpdate(id, userData, {
    returnDocument: "after",
    runValidators: true,
  });
};

const deleteUserRepo = async (id) => {
  return await userModel.findByIdAndUpdate(
    id,
    { deletedAt: new Date(), isActive: false },
    { new: true },
  );
};

const uploadProfileRepo = async (user, fileName) => {
  user.profile = fileName;

  const updatedUserProfile = await user.save();

  return updatedUserProfile;
};

module.exports = {
  getAllUsersRepo,
  getOneUserRepo,
  updateUserRepo,
  deleteUserRepo,
  uploadProfileRepo,
  addUserRepo,
  addCustomerRepo,
};
