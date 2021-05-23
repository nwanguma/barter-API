const express = require("express");

const { listProducts, createProduct } = require("../controllers/product");

const router = express.Router();

router.route("/").get(listProducts).post(createProduct);

module.exports = router;
