const express = require("express");
const { addComment, getComment } = require("../Controllers/comments");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");

router.route("/addComment").post(fetchuser, addComment);
router.route("/getComment").get(fetchuser, getComment);


module.exports = router;
