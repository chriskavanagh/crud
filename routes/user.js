const express = require("express");
require("express-async-errors");
const router = express.Router();
const {
  userCreateController,
  delUserController,
  loginController
} = require("../controllers/user");
const checkAuth = require("../middleware/auth");

router.post("/signup", userCreateController);

router.post("/login", loginController);

router.delete("/:userId", delUserController);

module.exports = router;
