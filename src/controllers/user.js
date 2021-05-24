const _ = require("lodash");
const User = require("../models/user");

const currentUser = async (req, res, next) => {
  res.json({
    message: "success",
    data: {
      title: "current user",
    },
  });
};

const login = async (req, res, next) => {
  res.json({
    message: "success",
    data: {
      title: "login",
    },
  });
};

const register = wrapAsync(async (req, res, next) => {
  const body = _.pick(req.body, ["email", "username", "password"]);
  const user = new User(body);

  const newUser = await user.save();
  const token = await newUser.generateAuthToken();

  res.status(201).json({
    message: "Created successfully",
    success: true,
    data: {
      user: newUser,
      token,
    },
  });
});

const logout = async (req, res, next) => {
  res.json({
    message: "logout",
    data: {
      title: "current user",
    },
  });
};
module.exports = {
  currentUser,
  login,
  register,
  logout,
};
