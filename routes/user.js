const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  userCreateController,
  delUserController,
  loginController,
  getUser
} = require("../controllers/user");

router.get("/me", checkAuth, getUser);

router.post("/signup", userCreateController);

router.post("/login", loginController);

router.delete("/delete/:userId", admin, delUserController);

module.exports = router;
