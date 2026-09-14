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
  return await userModel
    .find({ deletedAt: null })
    .select("-_id name email profile isActive uuid createdAt")
    .sort("-createdAt")
    .lean();
};

const getOneUserRepo = async (uuid) => {
  return await userModel
    .findOne({ uuid, deletedAt: null })
    .select("-_id name email profile isActive uuid")
    .lean();
};

const updateUserRepo = async (uuid, userData) => {
  return await userModel.findOneAndUpdate({ uuid, deletedAt: null }, userData, {
    returnDocument: "after",
    runValidators: true,
  });
};

const deleteUserRepo = async (uuid) => {
  return await userModel.findOneAndUpdate(
    { uuid, deletedAt: null },
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
