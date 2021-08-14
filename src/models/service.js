const { Schema, model } = require("mongoose");

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    charge: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "serviceCategory",
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "serviceType",
    },
    details: {
      experienceLength: String,
      description: String,
      skills: [String],
    },
    matches: [
      {
        type: Schema.Types.ObjectId,
        ref: "match",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    media: [String],
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    options: [
      {
        type: Schema.Types.ObjectId,
        ref: "schemaType",
      },
    ],
  },
  { timestamps: true }
);

ServiceSchema.methods.toJSON = async function () {
  const service = this.toObject();
  const { _id, ...rest } = service;

  return { ...rest };
};

const Service = model("service", ServiceSchema);

module.exports = Service;
