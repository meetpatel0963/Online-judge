const express = require("express");
const router = express.Router();
const Problem = require("../models/problem");

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

module.exports = router;
