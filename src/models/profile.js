const { Schema, model } = require("mongoose");
const validator = require("validator");

const ProfileSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    lastname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    bio: {
      type: String,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

ProfileSchema.methods.toJSON = function () {
  const body = this;
  const bodyObject = body.toObject();

  const response = _.pick(bodyObject, [
    "firstname",
    "lastname",
    "age",
    "gender",
    "email",
    "phone",
    "bio",
    "location",
  ]);

  return response;
};

const Profile = model("profile", ProfileSchema);

module.exports = Profile;
