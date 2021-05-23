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
  },
  { timestamps: true }
);

ProfileSchema.methods.toJSON = function () {
  const body = this;
  const bodyObject = body.toObject();

  const response = _.pick(bodyObject, []);
};

const Profile = model("profile", ProfileSchema);

module.exports = Profile;
