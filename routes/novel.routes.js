const express = require("express");

//controller function
const novelController = require("../controllers/novel.controller");

const router = express.Router();

router.get("/", novelController.getLatest);

router.get("/:id", (req, res) => {
  res.json({ mssg: "GET 1 book api" });
});

//Create 1 new novel
router.post("/", novelController.newNovel);

module.exports = router;
