const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const user = require("../../models/users");
const accessTokensModel = require("../../models/access_tokens");

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await user.findOne({
    email: email.toLowerCase(),
  });

  if (!existingUser) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password!" });
  }

  const token = jwt.sign(
    {
      email: existingUser.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  const newSessionToken = new accessTokensModel({
    userId: existingUser?._id,
    token,
    ipAddress: req.ip,
    userAgent: req.get("User-Agent"),
  });

  await newSessionToken.save();

  return res.status(200).json({
    message: "Login succesfull!",
    token,
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new user({
    name,
    email,
    password,
  });

  const registeredUser = await newUser.save();

  return res.status(201).json({
    message: "Registration succesfull!",
    user: registeredUser,
  });
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  // send email link to reset password

  return res.status(200).json({
    message: "Password reset link sent successfully on the registered email!",
  });
};

const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const user = req.user;

  if (!newPassword) {
    return res.status(400).json({ message: "New password is required!" });
  }

  user.password = newPassword;

  await user.save();

  return res.status(200).json({ message: "Password reset successfully!" });
};

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = req.user;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const validCurrentPassword = await bcrypt.compare(
    currentPassword,
    user.password,
  );

  if (!validCurrentPassword) {
    return res.status(401).json({ message: "Invalid password!" });
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json({ message: "Password updated successfully!" });
};

const logOutOfCurrentDevice = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided!" });
  }

  const deletedSession = await accessTokensModel.findOneAndDelete({
    token,
  });

  if (!deletedSession) {
    return res.status(404).json({ message: "Session already invalid!" });
  }

  return res.status(200).json({
    message: "Logged out successfully!",
  });
};

const logOutOfAllDevices = async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Unauthorized profile request!" });
  }

  const userId = req.user._id;

  await accessTokensModel.deleteMany({
    userId,
  });

  return res.status(200).json({
    message: "Logged out from all devices successfully!",
  });
};

const getCurrentUser = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }

  const profileUrl = user.profile
    ? `${process.env.BASE_URL}/uploads/users/${user.uuid}/${user.profile}`
    : null;

  return res.status(200).json({
    user: {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      profile: profileUrl,
      isActive: user.isActive,
    },
  });
};

module.exports = {
  userLogin,
  registerUser,
  forgetPassword,
  resetPassword,
  updatePassword,
  logOutOfCurrentDevice,
  logOutOfAllDevices,
  getCurrentUser,
};
