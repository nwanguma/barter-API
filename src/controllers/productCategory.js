const ProductCategory = require("../models/productCategory");
const AppError = require("../utils/AppError");

const getCategories = async (req, res, next) => {
  const categories = await ProductCategory.find({});

  res.json({
    success: true,
    data: categories,
  });
};

const createCategory = async (req, res, next) => {
  const { name } = req.body;

  const formattedName = name.toLowerCase();

  const takenCategory = await ProductCategory.findOne({ name: formattedName });

  if (takenCategory) throw new AppError("category already exists", 409);

  const newCategory = new ProductCategory({ name: formattedName });

  const category = await newCategory.save();

  res.status(201).json({
    success: true,
    data: category,
  });
};

module.exports = {
  getCategories,
  createCategory,
};
