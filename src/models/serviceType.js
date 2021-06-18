const { Schema, model } = require("mongoose");

const ServiceTypeSchema = new Schema(
  {
    name: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  },
  { timestamps: true }
);

const ServiceType = model("serviceType", ServiceTypeSchema);

module.exports = ServiceType;
