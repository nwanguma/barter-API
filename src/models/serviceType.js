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

ServiceTypeSchema.methods.toJSON = async function () {
  const serviceType = this;

  const { _id, name } = serviceType;

  return { id: _id, name };
};

const ServiceType = model("serviceType", ServiceTypeSchema);

module.exports = ServiceType;
