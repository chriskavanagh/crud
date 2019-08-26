const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const {
  listController,
  addCourseController
} = require("../controllers/courses");
const checkAuth = require("../middleware/auth");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// list all courses
router.get("/", checkAuth, listController);

// add a course
router.post("/add", addCourseController);

module.exports = router;
