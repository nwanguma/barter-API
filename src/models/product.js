const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "productCategory",
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "productType",
    },
    quantity: {
      type: String,
      required: true,
    },
    details: {
      dimensions: String,
      manufacturer: String,
      dateOfPurchase: Date,
      purchaseCondition: String,
      SKU: String,
      model: String,
      weight: String,
      color: String,
      description: String,
      additionalInformation: [String],
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
        ref: "productType",
      },
    ],
  },
  { timestamps: true }
);

ProductSchema.methods.toJSON = function () {
  const product = this.toObject();
  const { _id: id, ...rest } = product;

  return {
    id,
    ...rest,
  };
};

const Product = model("product", ProductSchema);

module.exports = Product;
