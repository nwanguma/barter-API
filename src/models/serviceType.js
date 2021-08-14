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
  const serviceType = this.toObject();
  const { _id: id, name } = serviceType;

  return { id, name };
};

const ServiceType = model("serviceType", ServiceTypeSchema);

module.exports = ServiceType;
