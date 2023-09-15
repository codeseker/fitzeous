const express = require("express");
const { searchBytag, getSingleBlog } = require("../Controllers/health");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");

router.route("/searchByTag").post(fetchuser, searchBytag);
router.route("/getSingleBlog").get(fetchuser, getSingleBlog);

module.exports = router;




