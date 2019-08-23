const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const {
  listController,
  addCourseController
} = require("../controllers/courses");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// list all courses
router.get("/", listController);

// add a course
router.post("/add", addCourseController);

module.exports = router;
