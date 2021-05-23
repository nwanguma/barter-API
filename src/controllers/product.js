const Product = require("../models/product");

const createProduct = async (req, res, next) => {
  res.json({
    title: "product",
  });
};

const listProducts = async (req, res, next) => {
  res.json({
    title: "product",
  });
};

module.exports = {
  createProduct,
  listProducts,
};
