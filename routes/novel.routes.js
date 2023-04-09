const express = require("express");

//controller function
const novelController = require("../controllers/novel.controller");

const router = express.Router();

router.get("/", novelController.getLatest);

router.get("/:id", (req, res) => {
  res.json({ mssg: "GET 1 novel api" });
});

//Create 1 new novel
router.post("/", novelController.newNovel);

//novel same types
router.post("/types", novelController.sameTypes);

module.exports = router;
