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

const ProductType = model("productType", ProductTypeSchema);

module.exports = ProductType;
