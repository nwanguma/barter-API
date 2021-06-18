const express = require("express");
const {
  ListProducts,
  CreateProduct,
  UpdateAllProducts,
  DeleteAllProducts,
  ListUserProducts,
  EditProduct,
  DeleteProduct,
} = require("../controllers/product");
const { createProductSchema } = require("../validation/schemas");

const router = express.Router();

router
  .route("/")
  .get(authenticate, ListProducts)
  .post(authenticate, inputValidation(createProductSchema), CreateProduct)
  .put(authenticate, inputValidation(createProductSchema), UpdateAllProducts)
  .delete(authenticate, DeleteAllProducts);

router
  .route("/id")
  .get(authenticate, ListUserProducts)
  .put(authenticate, EditProduct)
  .delete(authenticate, DeleteProduct);

module.exports = router;
