const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const AppError = require("../utils/AppError");
const _ = require("lodash");

const Register = wrapAsync(async (req, res, next) => {
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

  const token = user.generateAuthToken();

  console.log(token);

  const userWithProfile = await user.populate("profile").execPopulate();

  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: userWithProfile,
    token,
  });
});

const Login = wrapAsync(async (req, res, next) => {
  res.json({
    title: "testing from the land of login",
  });
});

const CurrentUser = wrapAsync(async (req, res, next) => {
  res.json({
    title: "testing from the land of get current user",
  });
});

const ResetPassword = wrapAsync(async (req, res, next) => {
  res.json({
    title: "testing from the land of reset password",
  });
});

module.exports = {
  Register,
  Login,
  CurrentUser,
  ResetPassword,
};
