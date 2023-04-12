const express = require("express");
const { searchBytag, getSingleBlog } = require("../Controllers/health");
const router = express.Router();

router.route("/searchByTag").post(searchBytag);
router.route("/getSingleBlog").get(getSingleBlog);

module.exports = router;