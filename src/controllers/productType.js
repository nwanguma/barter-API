const ProductType = require("../models/productType");
const AppError = require("../utils/AppError");
const { isValidObjectId } = require("../utils/helper");

const createProductType = async (req, res, next) => {
  const { name, category } = req.body;

  if (!isValidObjectId(category))
    throw new AppError("category is not valid", 400);

  const newProductType = new ProductType({ name, category });

  const productType = await newProductType.save();

  res.status(201).json({
    success: true,
    data: productType,
  });
};

const getProductTypes = async (req, res, next) => {
  const productTypes = await ProductType.find({});

  res.json({
    success: true,
    data: productTypes,
  });
};

const getProductTypesByCategory = async (req, res, next) => {
  const categoryId = req.params.id;

  if (!isValidObjectId(categoryId)) throw new AppError("id is not valid", 400);

  const productTypes = await ProductType.find({ category: categoryId });

  res.json({
    success: true,
    data: productTypes,
  });
};

module.exports = {
  getProductTypes,
  getProductTypesByCategory,
  createProductType,
};
