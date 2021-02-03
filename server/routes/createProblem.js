const express = require("express");
const router = express.Router();
const Problem = require("../models/problem");
const Submission = require("../models/submission");
const path = require("path");
const addSubmission = require("../judge/judge");
const auth = require("../middleware/auth");

const multer = require("multer");
const upload = multer({
  fileFilter: function (req, file, cb) {
    var filetypes = /text|txt|cpp|c|py|java/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    return cb(new Error("Only text files are allowed...$$"));
  },
}).fields([
  {
    name: "testcaseFile",
    maxCount: 1,
  },
  {
    name: "solutionFile",
    maxCount: 1,
  },
]);

router.post("/", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({ message: "Upload Failed. Try Again!!" });
    }

    let testCases = req.files.testcaseFile[0].buffer.toString();
    const solution = req.files.solutionFile[0].buffer.toString();

    testCases = testCases.split("Input").slice(1);

    let systemTestcase = [];

    testCases.forEach((curTest) => {
      const temp = curTest.split("Output");
      const curInput = temp[0].trim().replace(/[\r]+/gm, ""),
        curOutput = temp[1].trim().replace(/[\r]+/gm, "");

      systemTestcase.push({
        input: curInput,
        output: curOutput,
      });
    });

    const problem = new Problem({
      name: req.body.problemName,
      author: req.body.author,
      statement: req.body.problemStatement,
      sampleTestcase: JSON.parse(req.body.sampleTestcase),
      explanation: req.body.explanation,
      tags: JSON.parse(req.body.tags),
      systemTestcase: systemTestcase,
      time: req.body.time,
      memory: req.body.memory,
    });

    const submission = new Submission({
      problemName: problem.name,
      code: solution,
      lang: path.extname(req.files.solutionFile[0].originalname).split(".")[1],
    });

    addSubmission(problem, submission, "", "", (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Something Went Wrong! Try Again!!!" });

      let flag = false;

      result.every((curResult) => {
        console.log(curResult);
        let verdict;
        for (key in curResult) {
          if (curResult[key] === true) {
            verdict = key;
          }
        }

        if (verdict !== "AC") {
          flag = true;
          res.status(400).json({ message: "Problem Rejected..." });
          return false;
        } else {
          return true;
        }
      });

      if (!flag) {
        problem
          .save()
          .then(() => res.send(problem))
          .catch((err) =>
            res
              .status(500)
              .json({ message: "Problem is not saved! Try Again!!!" })
          );
      }
    });
  });
});

module.exports = router;
