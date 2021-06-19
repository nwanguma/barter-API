const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const AppError = require("../utils/AppError");
const _ = require("lodash");

const Register = wrapAsync(async (req, res) => {
  const { email, username, password, password_confirmation } = req.body;

  if (password !== password_confirmation)
    throw new AppError("Passwords do not match", 400);

  const newUser = new User({
    email,
    username,
    password,
    password_confirmation,
  });
  const user = await newUser.save();

  if (!user) throw new AppError("An error occured", 400);

  const token = await user.generateAuthToken();

  const userWithProfile = await user.populate("profile").execPopulate();

  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: {
      user: userWithProfile,
      token: token,
    },
  });
});

const Login = wrapAsync(async (req, res) => {
  const user = await User.findByCredentials(req.body);

  if (!user) throw new AppError("User not found", 400);

  const token = await user.generateAuthToken();
  const userWithProfile = await user.populate("profile").execPopulate();

  res.json({
    success: true,
    data: {
      user: userWithProfile,
      token: token,
    },
  });
});

const CurrentUser = wrapAsync(async (req, res) => {
  const userWithProfile = await req.user.populate("profile").execPopulate();

  console.log(userWithProfile);

  res.json({
    success: true,
    data: {
      user: userWithProfile,
    },
  });
});

const ResetPassword = wrapAsync(async (req, res) => {
  const user = req.user;
  const { password, new_password, password_confirmation } = req.body;

  if (password === new_password)
    throw new AppError("Please choose a new password", 400);

  if (new_password !== password_confirmation)
    throw new AppError("Passwords do not match", 400);

  const userPassword = await user.verifyPassword(password);

  if (!userPassword) {
    throw new AppError("Unauthorized!", 401);
  }

  user.password = password;

  await user.save();

  res.status(201).json({
    success: true,
    message: "Password reset successful!",
  });
});

const Logout = wrapAsync(async (req, res) => {
  const user = req.user;
  const token = req.token;

  user.tokens = user.tokens.filter((userToken) => {
    return userToken.token !== token;
  });

  await user.save();

  res.json({
    success: true,
  });
});

const LogoutAll = wrapAsync(async (req, res) => {
  const user = req.user;
  const token = req.token;

  user.tokens = [];

  await user.save();

  res.json({
    success: true,
  });
});

module.exports = {
  Register,
  Login,
  CurrentUser,
  ResetPassword,
  Logout,
  LogoutAll,
};
