const express = require("express");

const { listProfiles, createProfile } = require("../controllers/profile");

const router = express.Router();

router.route("/").get(listProfiles).post(createProfile);

module.exports = router;
