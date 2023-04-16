const express = require("express");
const router = express.Router();
const {login, createUser, getUser} = require("../Controllers/auth");
const fetchuser = require("../middleware/fetchUser");

router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/getUser").post(fetchuser, getUser);


module.exports = router;