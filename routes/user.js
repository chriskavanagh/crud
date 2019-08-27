const express = require("express");
const router = express.Router();
require("express-async-errors");
const checkAuth = require("../middleware/auth");

const {
  userCreateController,
  delUserController,
  loginController,
  getUser
} = require("../controllers/user");

router.get("/me", checkAuth, getUser);

router.post("/signup", userCreateController);

router.post("/login", loginController);

router.delete("/:userId", delUserController);

module.exports = router;
