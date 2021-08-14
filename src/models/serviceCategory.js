const { Schema, model } = require("mongoose");

const ServiceCategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "service",
      },
    ],
  },
  { timestamps: true }
);

ServiceCategorySchema.methods.toJSON = function () {
  const serviceCategory = this.toObject();
  const { name, _id: id } = serviceCategory;

  return {
    name,
    id,
  };
};

const ServiceCategory = model("serviceCategory", ServiceCategorySchema);

module.exports = ServiceCategory;
