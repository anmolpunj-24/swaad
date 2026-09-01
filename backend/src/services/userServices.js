const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

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
  const userDirectory = path.join(process.cwd(), "uploads", "users", user.uuid);

  fs.mkdirSync(userDirectory, { recursive: true });

  const oldProfile = user.profile;

  const originalName = path
    .parse(file.originalname)
    .name.replace(/[^a-zA-Z0-9-_]/g, "-");

  const fileName = `${Date.now()}-${originalName}.webp`;

  const filePath = path.join(userDirectory, fileName);

  try {
    await sharp(file.buffer)
      .resize(300, 300, {
        fit: "cover",
        position: "center",
      })
      .webp({
        quality: 80,
      })
      .toFile(filePath);

    const updatedUserProfile = await userRepo.uploadProfileRepo(user, fileName);

    if (oldProfile) {
      const oldImagePath = path.join(userDirectory, oldProfile);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    return updatedUserProfile;
  } catch (error) {
    // Remove newly-created image if something failed
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw error;
  }
};

module.exports = {
  addUserService,
  getAllUsersService,
  getOneUserService,
  updateUserService,
  deleteUserService,
  uploadProfileService,
};
