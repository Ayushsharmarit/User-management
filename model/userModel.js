// User schema
const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, unique: true },
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
