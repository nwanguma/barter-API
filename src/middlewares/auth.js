const User = require("../models/user");

const authentication = async (req, res, next) => {
  const token = req.header("Authorization");

  try {
    const user = await User.findByToken(token);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;
    req.token = token;

    next();
  } catch (e) {
    res.status(400).json({
      message: "An error occured",
    });
  }
};

module.exports = {
  authentication,
};
