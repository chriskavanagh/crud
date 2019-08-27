const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String, required: true }
});

// do not use arrow func, doesn't have own "this".
userSchema.methods.generateToken = function() {
  const token = jwt.sign(
    {
      email: this.email,
      userId: this._id
    },
    config.get("JWT_KEY"),
    {
      expiresIn: "1h"
    }
  );
  return token;
};

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: Joi.string()
      .min(4)
      .alphanum()
      .strip()
      .required()
  };

  return Joi.validate(user, schema);
}

const User = mongoose.model("User", userSchema);

module.exports.validate = validateUser;
module.exports.User = User;
