const express = require("express");
require("express-async-errors");
const router = express.Router();
const {
  userCreateController,
  delUserController
} = require("../controllers/user");

router.post("/signup", userCreateController);

router.delete("/:userId", delUserController);

module.exports = router;
