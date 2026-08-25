const fs = require("fs");
const path = require("path");

const userModel = require("../models/users");
const customerModel = require("../models/customers");

const addUserService = async (userData) => {
  const { name, email, password, gender, dob, phone } = userData;

  const newUser = new userModel({
    name,
    email,
    password,
  });

  const savedUser = await newUser.save();

  const newCustomer = new customerModel({
    userId: savedUser?._id,
    gender,
    dob,
    phone,
  });

  await newCustomer.save();

  return savedUser;
};

const getAllUsersService = async () => {
  const allUsers = await userModel.find();

  return allUsers;
};

const getOneUserService = async (id) => {
  const userData = await userModel.findById(id);

  return userData;
};

const updateUserService = async (id, userData) => {
  const updatedUser = await userModel.findByIdAndUpdate(id, userData, {
    returnDocument: "after",
    runValidators: true,
  });

  return updatedUser;
};

const deleteUserService = async (id) => {
  const deletedUser = await userModel.findByIdAndUpdate(
    id,
    { deletedAt: new Date(), isActive: false },
    { new: true },
  );
  return deletedUser;
};

const uploadProfileService = async (user, file) => {
  if (user.profile) {
    const oldImagePath = path.join(
      process.cwd(),
      "uploads",
      user._id,
      user.profile,
    );
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }

  user.profile = file.filename;

  const updatedUserProfile = await user.save();

  return updatedUserProfile;
};

module.exports = {
  addUserService,
  getAllUsersService,
  getOneUserService,
  updateUserService,
  deleteUserService,
  uploadProfileService,
};
