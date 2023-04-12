const express = require("express");
const { addComment, getComment } = require("../Controllers/comments");
const router = express.Router();

router.route("/addComment").post(addComment);
router.route("/getComment").get(getComment);


module.exports = router;
