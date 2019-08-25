const express = require("express");
require("express-async-errors");
const router = express.Router();
const {
  userCreateController,
  delUserController,
  loginController
} = require("../controllers/user");

router.post("/signup", userCreateController);

router.post("/login", loginController);

router.delete("/:userId", delUserController);

module.exports = router;
