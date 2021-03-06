const { ObjectID } = require("mongodb");

const Product = require("../models/product.js");
const AppError = require("../utils/AppError.js");

const { isValidObjectId } = require("../utils/helper.js");

const createProduct = async (req, res) => {
  const user = req.user;
  const productId = new ObjectID();

  const {
    name,
    price,
    category,
    type,
    quantity,
    details,
    media,
    location,
    options,
  } = req.body;

  if (!isValidObjectId(type))
    throw new AppError("Product type is not valid", 400);

  if (!isValidObjectId(category))
    throw new AppError("Category is not valid", 400);

  const newProduct = new Product({
    _id: productId,
    name,
    price,
    category,
    type,
    quantity,
    details,
    media,
    location,
    options,
    user: user._id,
  });

  const product = await newProduct.save();

  user.products.push(productId);

  await user.save();

  res.status(201).json({
    success: true,
    data: product,
  });
};

const getUserProducts = async (req, res, next) => {
  const user = req.user;
  const queries = req.query;
  const { page, sortBy, limit, price, category, type, quantity } = queries;
  const match = {};
  const sort = {};

  if (price) match.price = price;
  if (category) match.category = category;
  if (type) match.type = type;
  if (quantity) match.quantity = quantity;

  if (sortBy) {
    const parts = sortBy.split(":");
    const key = parts[0];
    const value = parts[1] === "desc" ? -1 : 1;

    sort[key] = value;
  }

  await user
    .populate({
      path: "products",
      match,
      options: {
        skip: parseInt(page),
        limit: parseInt(limit),
        sort,
      },
    })
    .execPopulate();

  res.json({
    success: true,
    data: req.user.products,
  });
};

const getUserProduct = async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  if (!isValidObjectId(id)) throw new AppError("product id is not valid", 400);

  const product = await Product.findOne({
    user: user._id,
    _id: id,
  }).populate("product");

  if (!product) throw new AppError("product not found", 404);

  res.json({
    success: true,
    data: product,
  });
};

const getProduct = async (req, res) => {
  const id = req.params.id;

  if (!isValidObjectId(id)) throw new AppError("product id is not valid", 400);

  const product = await Product.findOne({
    _id: id,
  }).populate("product");

  if (!product) throw new AppError("product not found", 404);

  res.json({
    success: true,
    data: product,
  });
};

const editProduct = async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  if (!isValidObjectId(id)) throw new AppError("product id is not valid", 400);

  const {
    name,
    price,
    category,
    type,
    quantity,
    details,
    media,
    location,
    options,
  } = req.body;

  if (!isValidObjectId(type))
    throw new AppError("Product type is not valid", 400);

  if (!isValidObjectId(category))
    throw new AppError("Category is not valid", 400);

  const updatedProduct = await Product.findOneAndUpdate(
    { user: user._id, _id: id },
    {
      $set: {
        name,
        price,
        category,
        type,
        quantity,
        details,
        media,
        location,
        options,
        user: user._id,
      },
    }
  );

  if (!updatedProduct) throw new AppError("product not found", 404);

  res.status(201).json({
    success: true,
    data: updatedProduct,
  });
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  if (!isValidObjectId(id)) throw new AppError("product id is not valid", 400);

  const product = await Product.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });

  if (!product) throw new AppError("product not found", 404);

  res.send({
    success: true,
    message: "Deleted successfully",
  });
};

const getAllProducts = async (req, res) => {
  const user = req.user;
  const queries = req.query;
  const { page, sortBy, limit, price, category, type, quantity } = queries;
  const match = {};
  const sort = {};

  if (price) match.price = price;
  if (category) match.category = category;
  if (type) match.type = type;
  if (quantity) match.quantity = quantity;

  if (sortBy) {
    const parts = sortBy.split(":");
    const key = parts[0];
    const value = parts[1] === "desc" ? -1 : 1;

    sort[key] = value;
  }

  const products = await Product.find(match)
    .skip(parseInt(page))
    .limit(parseInt(limit))
    .sort(sort);

  res.json({
    success: true,
    data: products,
  });
};

module.exports = {
  createProduct,
  getUserProducts,
  editProduct,
  deleteProduct,
  getAllProducts,
  getUserProduct,
  getProduct,
};
