const express = require("express");
const { loginUser } = require("../controllers/user");
const { verifyUser } = require("../middleware/verifyUser");
const router = express.Router();

router.route("/").post(verifyUser, loginUser);

module.exports = router