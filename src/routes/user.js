const express = require("express");

const { currentUser, login, register, logout } = require("../controllers/user");

const router = express.Router();

router.get("/me", currentUser);

router.post("/login", login);

router.post("/register", register);

router.delete("/logout", logout);

module.exports = router;
