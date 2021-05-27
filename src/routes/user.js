const express = require("express");
const {
  Register,
  Login,
  ResetPassword,
  CurrentUser,
  Logout,
  LogoutAll,
} = require("../controllers/user");
const { inputValidation } = require("../middleware/validation");
const authenticate = require("../middleware/auth");
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
router.get("/me", authenticate, CurrentUser);
router.post(
  "/password/reset",
  authenticate,
  inputValidation(passwordResetValidationSchema),
  ResetPassword
);
router.post("/logout", authenticate, Logout);
router.post("/logout/all", authenticate, LogoutAll);

module.exports = router;
