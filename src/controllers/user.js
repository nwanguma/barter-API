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

const register = async (req, res, next) => {
  const body = _.pick(req.body, ["email", "username", "password"]);
  const user = new User(body);

  try {
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
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "An error occured",
      error: true,
    });
  }
};

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
