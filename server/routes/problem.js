const express = require("express");
const router = express.Router();
const Problem = require("../models/problem");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  Problem.find({})
    .then((problems) => res.send(problems))
    .catch((err) => res.status(500).json({ message: "Something Went Wrong!" }));
});

router.get("/:name", (req, res) => {
  Problem.findOne({ name: req.params.name })
    .then((problem) => res.send(problem))
    .catch((err) => res.status(404).json({ message: "Problem Not Found!!" }));
});

router.post("/", auth, (req, res) => {
  const problem = new Problem({
    name: req.body.name,
    author: req.body.author,
    statement: req.body.statement,
    sampleTestcase: req.body.sampleTestcase,
    explanation: req.body.explanation,
    tags: req.body.tags,
    systemTestcase: req.body.systemTestcase,
    time: req.body.time,
    memory: req.body.memory,
  });

  problem
    .save()
    .then((res) => null)
    .catch((err) => res.status(500).json({ message: "Something Went Wrong!" }));

  res.send(problem);
});

module.exports = router;
