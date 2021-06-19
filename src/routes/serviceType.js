const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const authenticate = require("../middleware/auth");

const {
  getServiceTypes,
  createServiceType,
  getServiceTypesByCategory,
} = require("../controllers/serviceType");

const router = express.Router();

router
  .route("/")
  .get(authenticate, wrapAsync(getServiceTypes))
  .post(authenticate, wrapAsync(createServiceType));

router
  .route("/category/:id")
  .get(authenticate, wrapAsync(getServiceTypesByCategory));

module.exports = router;
