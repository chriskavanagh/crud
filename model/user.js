const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String, required: true }
});

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
