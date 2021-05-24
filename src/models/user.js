const { Schema, model } = require("mongoose");
const validator = require("validator");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const Profile = require("./profile");
const { ObjectID } = require("mongodb");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    profile: {
      ref: "profile",
      type: Schema.Types.ObjectId,
    },
    tokens: [
      {
        access: {
          type: String,
          required: true,
        },
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

User.methods.generateProfile = async function () {
  const user = this;
  const userObject = user.toObject();
  const profileId = new ObjectID();

  const newProfile = new Profile({
    _id: profileId,
    user: userObject._id,
    email: userObject.email,
    username: userObject.username,
  });

  await newProfile.save();

  user.profile = profileId;

  return user.save();
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const access = "auth";

  const token = jwt
    .sign(
      {
        _id: user._id.toHexString(),
        access,
      },
      process.env.SECRET
    )
    .toString();

  await user.updateOne({
    $push: {
      tokens: {
        token,
        access,
      },
    },
  });

  return token;
};

UserSchema.statics.findByToken = async function (token) {
  const User = this;
  const decoded = jwt.verify(token, process.env.SECRET);

  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": decoded.access,
  });
};

UserSchema.methods.toJSON = function () {
  const body = this;
  const bodyObject = body.toObject();

  const response = _.pick(bodyObject, ["email", "username", "id", "profile"]);

  return response;
};

UserSchema.pre("save", function (next) {
  const user = this;

  user.populate("profile").execPopulate();

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;

        next();
      });
    });
  } else {
    next();
  }
});

const User = model("user", UserSchema);

module.exports = User;
