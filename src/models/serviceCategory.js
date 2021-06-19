const { Schema, model } = require("mongoose");

const ServiceCategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  { timestamps: true }
);

ServiceCategorySchema.methods.toJSON = function () {
  const product = this;

  const { name, _id } = product;

  return {
    name,
    id: _id,
  };
};

const ServiceCategory = model("serviceCategory", ServiceCategorySchema);

module.exports = ServiceCategory;
