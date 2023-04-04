const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ mssg: "GET all books api" });
});

router.get("/:id", (req, res) => {
  res.json({ mssg: "GET 1 book api" });
});

router.post("/", async (req, res) => {
  res.json({ mssg: "POST 1 book api" });
});

module.exports = router;
