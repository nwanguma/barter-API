const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  user: {
    ref: "user",
    type: Schema.Types.ObjectId,
  },
  isBanned: {
    type: Boolean,
  },
  isVerified: {
    type: Boolean,
  },
  isOnline: {
    type: Boolean,
  },
  lastActive: {
    type: Date,
  },
});

ProfileSchema.methods.toJSON = function () {
  const {
    email,
    username,
    firstname,
    lastname,
    gender,
    age,
    location,
    lastActive,
    isOnline,
    isVerified,
  } = this;

  return {
    email,
    username,
    firstname,
    lastname,
    gender,
    age,
    location,
    lastActive,
    isOnline,
    isVerified,
  };
};

const Profile = model("profile", ProfileSchema);

module.exports = Profile;
