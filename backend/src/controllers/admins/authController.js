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

  return res.status(200).json({
    message: "Login succesfull!",
    token: token,
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
  const { newPassword, confirmNewPassword } = req.body;
  const user = req.user;

  if (!newPassword || !confirmNewPassword) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  if (newPassword != confirmNewPassword) {
    return res
      .status(422)
      .json({ message: "New password and confirm password does not match!" });
  }

  user.password = newPassword;

  const updatedPassword = await user.save();

  return res.status(200).json({ message: "Password reset successfully!" });
};

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const user = req.user;

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  if (newPassword != confirmNewPassword) {
    return res
      .status(422)
      .json({ message: "New password and confirm password does not match!" });
  }

  const validCurrentPassword = await bcrypt.compare(
    currentPassword,
    user.password,
  );

  if (!validCurrentPassword) {
    return res.status(401).json({ message: "Invalid password!" });
  }

  user.password = newPassword;

  const updatedPassword = await user.save();

  return res.status(200).json({ message: "Password updated successfully!" });
};

const logout = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(400).json({ message: "User not found!" });
  }

  const deletedSessionToken = await accessTokensModel.deleteOne({ _id: id });

  return res.status(200).json({ message: "Logout successfull!" });
};

const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    message: "User authenticated!",
    user: req.user,
  });
};

module.exports = {
  userLogin,
  registerUser,
  forgetPassword,
  resetPassword,
  updatePassword,
  logout,
  getCurrentUser,
};
