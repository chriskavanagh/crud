const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { User, validate } = require("../model/user");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

exports.userCreateController = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.find({ email: req.body.email });
  console.log(user);
  if (user.length > 0) {
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
        res.status(201).json({ message: "User Created" });
      }
    });
  }
};

exports.delUserController = async (req, res, next) => {
  const user = await User.findByIdAndRemove(req.params.userId);
  if (!user) return res.status(404).send("The user was not found.");
  res.status(200).json({ message: "User Deleted", user: user });
};
