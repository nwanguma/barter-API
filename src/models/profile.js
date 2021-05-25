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
  gender: {
    type: String,
  },
  age: {
    type: Number,
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
});

ProfileSchema.methods.toJSON = function () {
  const { email, username, gender, age, location } = this.toObject();

  return { email, username, gender, age, location };
};

const Profile = model("profile", ProfileSchema);

module.exports = Profile;
