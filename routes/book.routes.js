const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ mssg: "GET all books api" });
});

router.get("/:id", (req, res) => {
  res.json({ mssg: "GET 1 book api" });
});

router.post("/", (req, res) => {
  res.json({ mssg: "POST a chapter api" });
});

module.exports = router;
