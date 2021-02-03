const mongoose = require("mongoose");

const sample = new mongoose.Schema({
  input: {
    type: String,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
});

const ProblemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  statement: {
    type: String,
    required: true,
  },
  sampleTestcase: {
    type: [sample],
    required: true,
  },
  explanation: {
    type: String,
  },
  tags: {
    type: Array,
    required: true,
  },
  countAC: {
    type: Number,
    default: 0,
  },
  countTotal: {
    type: Number,
    default: 0,
  },
  systemTestcase: {
    type: [sample],
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  memory: {
    type: Number,
    required: true,
  },
});

const Problem = mongoose.model("Problem", ProblemSchema);

module.exports = Problem;
