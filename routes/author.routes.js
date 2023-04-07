const express = require("express");

// controller functions
const authorController = require("../controllers/author.controller");

const router = express.Router();

router.get("/all", authorController.getAll);
router.post("/new", authorController.newAuthor);

module.exports = router;
