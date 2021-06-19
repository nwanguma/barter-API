const express = require("express");
const {
  createService,
  getUserServices,
  editService,
  deleteService,
  getAllServices,
  getUserService,
  getService,
} = require("../controllers/service");

const { inputValidation } = require("../middleware/validation");
const { serviceValidationSchema } = require("../validation/schemas");

const wrapAsync = require("../utils/wrapAsync");

const authenticate = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(authenticate, wrapAsync(getUserServices))
  .post(
    authenticate,
    inputValidation(serviceValidationSchema),
    wrapAsync(createService)
  );

router.route("/all").get(authenticate, wrapAsync(getAllServices));
router.route("/all/:id").get(authenticate, wrapAsync(getService));

router
  .route("/:id")
  .get(authenticate, wrapAsync(getUserService))
  .put(authenticate, wrapAsync(editService))
  .delete(authenticate, wrapAsync(deleteService));

module.exports = router;
