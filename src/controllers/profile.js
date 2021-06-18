const Profile = require("../models/profile");

const getProfile = async (req, res, next) => {
  const user = req.user;

  const profile = await Profile.findOne({ user: user._id });

  res.json({
    success: true,
    data: profile,
  });
};

const getAllProfiles = async (req, res, next) => {
  const profile = await Profile.find();

  res.json({
    success: true,
    data: profile,
  });
};

const editProfile = async (req, res, next) => {
  const user = req.user;
  const { firstname, lastname, gender, age, location } = req.body;

  const profile = await Profile.findOneAndUpdate(
    { user: user._id },
    {
      $set: {
        firstname,
        lastname,
        gender,
        age,
        location,
      },
    }
  );

  res.status(201).json({
    success: true,
    data: profile,
    message: "Updated successfully",
  });
};

module.exports = {
  getProfile,
  getAllProfiles,
  editProfile,
};
