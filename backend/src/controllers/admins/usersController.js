const userService = require("../../services/userServices");

const addUser = async (req, res) => {
  const newUser = await userService.addUserService(req.body);

  return res.status(201).json({ message: "User created!", user: newUser });
};

const getAllUsers = async (req, res) => {
  const allUsers = await userService.getAllUsersService();

  return res
    .status(200)
    .json({ message: "All users fetched!", users: allUsers });
};

const getOneUser = async (req, res) => {
  const userId = req.params.uuid;

  const userData = await userService.getOneUserService(userId);

  return res.status(200).json({ message: "User fetched!", user: userData });
};

const updateUser = async (req, res) => {
  const userId = req.params.uuid;
  const body = req.body;

  const updatedUser = await userService.updateUserService(userId, body);

  return res.status(200).json({ message: "User updated!", user: updatedUser });
};

const deleteUser = async (req, res) => {
  const userId = req.params.uuid;

  const deletedUser = await userService.deleteUserService(userId);

  return res.status(200).json({ message: "User deleted!", user: deletedUser });
};

const uploadProfile = async (req, res) => {
  const user = req.user;
  const file = req.file;

  if (!user.uuid) {
    return res.status(404).json({ message: "User not found!" });
  }

  if (!file) {
    return res.status(400).json({ message: "No file provided!" });
  }

  const updatedUserProfile = await userService.uploadProfileService(user, file);

  const profileUrl = `${req.protocol}://${req.get("host")}/uploads/users/${user.uuid}/${updatedUserProfile.profile}`;

  return res.status(200).json({
    message: "Profile picture updated!",
    profile: profileUrl,
  });
};

module.exports = {
  addUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  uploadProfile,
};
