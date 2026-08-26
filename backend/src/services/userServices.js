const fs = require("fs");
const path = require("path");

const userRepo = require("../repositories/userRepository");

const addUserService = async (userData) => {
  const { name, email, password, gender, dob, phone } = userData;

  const savedUser = await userRepo.addUserRepo({ name, email, password });

  await userRepo.addCustomerRepo({
    userId: savedUser._id,
    gender,
    dob,
    phone,
  });

  return savedUser;
};

const getAllUsersService = async () => {
  const allUsers = await userRepo.getAllUsersRepo();

  return allUsers;
};

const getOneUserService = async (id) => {
  const userData = await userRepo.getOneUserRepo(id);

  return userData;
};

const updateUserService = async (id, userData) => {
  const updatedUser = await userRepo.updateUserRepo(id, userData);

  return updatedUser;
};

const deleteUserService = async (id) => {
  const deletedUser = await userRepo.deleteUserRepo(id);
  return deletedUser;
};

const uploadProfileService = async (user, file) => {
  if (user.profile) {
    const oldImagePath = path.join(
      process.cwd(),
      "uploads",
      "users",
      user.uuid,
      user.profile,
    );
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }

  const updatedUserProfile = await userRepo.uploadProfileRepo(user, file);

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
