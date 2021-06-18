const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: String,
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  { timestamps: true }
);

const Category = model("category", CategorySchema);

module.exports = Category;
