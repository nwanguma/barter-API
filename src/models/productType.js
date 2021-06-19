const { Schema, model } = require("mongoose");

const ProductTypeSchema = new Schema(
  {
    name: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  },
  { timestamps: true }
);

ProductTypeSchema.methods.toJSON = function () {
  const productType = this;

  console.log(productType);

  const { _id, name } = productType;

  console.log(_id, name);

  return { id: _id, name };
};

const ProductType = model("productType", ProductTypeSchema);

module.exports = ProductType;
