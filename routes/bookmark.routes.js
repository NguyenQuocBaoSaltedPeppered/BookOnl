const express = require("express");

//controller function
const bookmarkController = require("../controllers/bookmark.controller");

const router = express.Router();

//POST a new bookmark
router.post("/", bookmarkController.newBookmark);

//POST to get bookmark for a account
router.post("/get", bookmarkController.getBookmark);

//DELETE bookmark
router.delete("/:bookmarkId", bookmarkController.deleteBookmark);

module.exports = router;
