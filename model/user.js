const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const PasswordComplexity = require("joi-password-complexity");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String, required: true },
  isAdmin: Boolean
});

// do not use arrow func, doesn't have own "this".
userSchema.methods.generateToken = function() {
  const token = jwt.sign(
    {
      email: this.email,
      userId: this._id,
      isAdmin: this.isAdmin
    },
    config.get("JWT_KEY"),
    {
      expiresIn: "1h"
    }
  );
  return token;
};

const complexityOptions = {
  min: 5,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 1
};

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    password: new PasswordComplexity(complexityOptions),
    isAdmin: Joi.boolean()
  };

  return Joi.validate(user, schema);
}

const User = mongoose.model("User", userSchema);

module.exports.validate = validateUser;
module.exports.User = User;
