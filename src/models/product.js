const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true,
      minlength: 1,
    },
  },
  { timestamps: true }
);

const Product = model("product", productSchema);

module.exports = {
  Product,
};
