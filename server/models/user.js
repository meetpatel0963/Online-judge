const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  stats: {
    totalCount: {
      type: Number,
      default: 0,
    },
    ACCount: {
      type: Number,
      default: 0,
    },
    WACount: {
      type: Number,
      default: 0,
    },
    TLECount: {
      type: Number,
      default: 0,
    },
    MLECount: {
      type: Number,
      default: 0,
    },
    CECount: {
      type: Number,
      default: 0,
    },
    RTECount: {
      type: Number,
      default: 0,
    },
    easy: {
      type: Number,
      default: 0,
    },
    medium: {
      type: Number,
      default: 0,
    },
    hard: {
      type: Number,
      default: 0,
    },
  },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
