const express = require("express");
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
  let course = await Course.create(req.body);
  res.send(course);
};
