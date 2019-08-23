const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
const { Course, validate } = require("../model/course");
//const validateObjectId = require("../middleware/validateObjectId");

exports.listController = async (req, res, next) => {
  // find all courses
  const courses = await Course.find({});
  res.send(courses);
};

exports.addCourseController = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //const course = await Course.create(req.body);
  const course = new Course({
    _id: new mongoose.Types.ObjectId(),
    courseName: req.body.courseName,
    courseId: req.body.courseId,
    courseDuration: req.body.courseDuration,
    courseFee: req.body.courseFee
  });
  await course.save();
  res.send(course);
};
