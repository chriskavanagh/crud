const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { User, validate } = require("../model/user");
const jwt = require("jsonwebtoken");
const config = require("config");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// get user
exports.getUser = async (req, res) => {
  console.log(req.user.userId);
  const user = await User.findById(req.user.userId).select("-password");
  res.send(user);
};

// create new user
exports.userCreateController = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (user) {
    return res.status(409).json({ message: "Email Already Exists" });
  } else {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: hash
        });
        await user.save();
        res.status(201).json({ user: user, message: "User Created" });
      }
    });
  }
};

// delete user
exports.delUserController = async (req, res, next) => {
  const user = await User.findByIdAndRemove(req.params.userId);
  if (!user) return res.status(404).send("The user was not found.");
  res.status(200).json({ message: "User Deleted", user: user });
};

// login user
exports.loginController = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateToken(); // instance method on User-Model
  console.log(token);

  return res
    .status(200)
    .header("Bearer", token)
    .json({ message: "Authentication Successful", token: token });
};
