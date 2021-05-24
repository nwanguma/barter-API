const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const AppError = require("../utils/AppError");

const Register = wrapAsync(async (req, res, next) => {
  res.json({
    title: "testing from the land of register",
  });
});

const Login = wrapAsync(async (req, res, next) => {
  res.json({
    title: "testing from the land of login",
  });
});

module.exports = {
  Register,
  Login,
};
