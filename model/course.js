const mongoose = require("mongoose");
const Joi = require("joi");

const CourseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  courseName: {
    type: String,
    required: true
  },
  courseId: {
    type: String
  },
  courseDuration: {
    type: String
  },
  courseFee: {
    type: String
  }
});

function validateCourse(course) {
  const schema = {
    courseName: Joi.string()
      .min(3)
      .max(50)
      .required(),
    courseId: Joi.string(),
    courseDuration: Joi.string()
      .min(1)
      .required(),
    courseFee: Joi.string()
      .min(1)
      .max(10)
      .required()
  };

  return Joi.validate(course, schema);
}

const Course = mongoose.model("Course", CourseSchema);
module.exports.validate = validateCourse;
module.exports.Course = Course;
