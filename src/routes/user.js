const express = require("express");
const { Register, Login } = require("../controllers/user");
const { inputValidation } = require("../middleware/validation");
const {
  registerValidationSchema,
  loginValidationSchema,
} = require("../validation/schemas");

const router = express.Router();

router.route("/").get((req, res, next) => {
  res.json({
    title: "testing",
  });
});

router.post("/register", inputValidation(registerValidationSchema), Register);

router.post("/login", inputValidation(loginValidationSchema), Login);

module.exports = router;
