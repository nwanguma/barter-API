const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const authenticate = require("../middleware/auth");

const {
  getProductTypes,
  createProductType,
  getProductTypesByCategory,
} = require("../controllers/productType");

const router = express.Router();

router
  .route("/")
  .get(authenticate, wrapAsync(getProductTypes))
  .post(authenticate, wrapAsync(createProductType));

router
  .route("/category/:id")
  .get(authenticate, wrapAsync(getProductTypesByCategory));

module.exports = router;
