const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const {
  listController,
  addCourseController
} = require("../controllers/courses");
const checkAuth = require("../middleware/auth");

// list all courses
router.get("/", checkAuth, listController);

// add a course
router.post("/add", addCourseController);

module.exports = router;
