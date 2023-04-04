const express = require("express");

// controller functions
const { newAuthor } = require("../controllers/author.controller");

const router = express.Router();

// login route
router.post("/new", newAuthor);

module.exports = router;
