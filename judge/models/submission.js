const mongoose = require("mongoose");

const testcases = new mongoose.Schema({
  time: {
    type: Number,
    required: true,
  },
  memory: {
    type: Number,
    required: true,
  },
  verdict: {
    type: String,
    required: true,
  },
});

const SubmissionSchema = new mongoose.Schema({
  problemName: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  language: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  verdict: {
    type: String,
  },
  result: {
    type: [testcases],
    required: true,
  },
});

const Submission = mongoose.model("Submission", SubmissionSchema);

module.exports = Submission;
