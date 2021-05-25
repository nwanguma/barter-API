const { Schema, model } = require("mongoose");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ObjectID } = require("mongodb");
const Profile = require("../models/profile");

const UserSchema = new Schema(
  {
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
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "profile",
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
        access: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.methods.generateProfile = async function () {
  const user = this;
  const profileId = new ObjectID();

  const generatedProfile = new Profile({
    _id: profileId,
    user: user._id,
    username: user.username,
    email: user.email,
  });

  user.update({
    $set: {
      profile: profile._id,
    },
  });

  return generatedProfile.save();
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const access = "auth";
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, process.env.SECRET)
    .toString();

  await user.update({
    $push: {
      tokens: {
        token,
        access,
      },
    },
  });

  return token;
};

UserSchema.pre("save", function (next) {
  const user = this;

  if (user.isNew) {
    const profileId = new ObjectID();
    const generatedProfile = new Profile({
      _id: profileId,
      user: user._id,
      username: user.username,
      email: user.email,
    });

    //There's probably a cleaner way to do this
    generatedProfile.save().then((profile) => {
      user.profile = profile._id;
    });
  }

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hashedPassword) => {
        user.password = hashedPassword;

        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  const { email, username, profile } = user;

  return { email, username, profile };
};

const User = model("user", UserSchema);

module.exports = User;
