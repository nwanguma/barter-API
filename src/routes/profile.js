const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const authenticate = require("../middleware/auth");

const { inputValidation } = require("../middleware/validation");
const { profileUpdateValidationSchema } = require("../validation/schemas");

const {
  getProfile,
  getAllProfiles,
  editProfile,
} = require("../controllers/profile");

const router = express.Router();

router
  .route("/")
  .get(authenticate, wrapAsync(getProfile))
  .put(
    authenticate,
    inputValidation(profileUpdateValidationSchema),
    wrapAsync(editProfile)
  );

router.route("/all").get(authenticate, wrapAsync(getAllProfiles));

module.exports = router;
