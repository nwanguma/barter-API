const express = require("express");
const {
  Register,
  Login,
  ResetPassword,
  CurrentUser,
} = require("../controllers/user");
const { inputValidation } = require("../middleware/validation");
const {
  registerValidationSchema,
  loginValidationSchema,
  passwordResetValidationSchema,
} = require("../validation/schemas");

const router = express.Router();

router.route("/").get((req, res, next) => {
  res.json({
    title: "testing",
  });
});
router.post("/register", inputValidation(registerValidationSchema), Register);
router.post("/login", inputValidation(loginValidationSchema), Login);
router.get("/me", CurrentUser);
router.post(
  "/password/reset",
  inputValidation(passwordResetValidationSchema),
  ResetPassword
);

module.exports = router;
