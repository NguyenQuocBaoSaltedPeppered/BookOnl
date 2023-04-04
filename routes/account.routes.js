const express = require("express");

// controller functions
const {
  loginAccount,
  signupAccount,
} = require("../controllers/accountController");

const router = express.Router();

// login route
router.post("/login", loginAccount);

// signup route
router.post("/signup", signupAccount);

module.exports = router;
