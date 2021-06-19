const express = require("express");
const {
  createProduct,
  getUserProducts,
  editProduct,
  deleteProduct,
  getAllProducts,
  getUserProduct,
  getProduct,
} = require("../controllers/product");

const wrapAsync = require("../utils/wrapAsync");

const { inputValidation } = require("../middleware/validation");
const { productValidationSchema } = require("../validation/schemas");

const authenticate = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(authenticate, wrapAsync(getUserProducts))
  .post(
    authenticate,
    inputValidation(productValidationSchema),
    wrapAsync(createProduct)
  );

router.route("/all").get(authenticate, wrapAsync(getAllProducts));
router.route("/all/:id").get(authenticate, wrapAsync(getProduct));

router
  .route("/:id")
  .get(authenticate, wrapAsync(getUserProduct))
  .put(authenticate, wrapAsync(editProduct))
  .delete(authenticate, wrapAsync(deleteProduct));

module.exports = router;
