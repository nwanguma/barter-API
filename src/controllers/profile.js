const Profile = require("../models/profile");

const createProfile = async (req, res, next) => {
  res.json({
    title: "profile",
  });
};

const listProfiles = async (req, res, next) => {
  res.json({
    title: "profile",
  });
};

module.exports = {
  createProfile,
  listProfiles,
};
