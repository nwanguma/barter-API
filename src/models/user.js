const { Schema, model } = require("mongoose");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ObjectID } = require("mongodb");
const Profile = require("../models/profile");
const validator = require("validator");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      unique: true,
      validate: {
        validator: validator.isEmail,
        messsage: "{VALUE} is not a valid email",
      },
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      unique: true,
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

UserSchema.statics.findByCredentials = async function ({
  email,
  username,
  password,
}) {
  const User = this;
  const id = email || username;

  const user = await User.findOne({
    $or: [
      {
        email: id,
      },
      {
        username: id,
      },
    ],
  });

  if (!user) return;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) reject({ message: "Invalid credentials", status: 401 });

      resolve(user);
    });
  });
};

UserSchema.methods.verifyPassword = async function (password) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) reject({ message: "Invalid credentials", status: 401 });

      resolve(password);
    });
  });
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const access = "auth";
  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, process.env.SECRET)
    .toString();

  user.tokens.push({
    access,
    token,
  });

  await user.save();

  return token;
};

UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET);
  } catch (e) {
    return Promise.reject({ status: 401, message: "User not authorized" });
  }

  return User.findOne({
    _id: new ObjectID(decoded._id),
    "tokens.token": token,
    "tokens.access": "auth",
  });
};

UserSchema.pre("save", function (next) {
  const user = this;

  if (user.isNew) {
    const profileId = new ObjectID();

    //Need to decide soon if I want default values for profile
    //or a different approach to creating one
    const generatedProfile = new Profile({
      _id: profileId,
      user: user._id,
      username: user.username,
      email: user.email,
      firstname: "",
      lastname: "",
      gender: "",
      age: "",
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
  const { firstname, lastname, gender, age, location } = profile;

  return {
    email,
    username,
    profile: {
      firstname,
      lastname,
      gender,
      age,
      location,
    },
  };
};

const User = model("user", UserSchema);

module.exports = User;
