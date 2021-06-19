const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const authenticate = require("../middleware/auth");

const { categoryValidationSchema } = require("../validation/schemas");
const { inputValidation } = require("../middleware/validation");

const {
  getCategories,
  createCategory,
} = require("../controllers/productCategory");

const router = express.Router();

router
  .route("/")
  .get(authenticate, wrapAsync(getCategories))
  .post(
    authenticate,
    inputValidation(categoryValidationSchema),
    wrapAsync(createCategory)
  );

module.exports = router;
