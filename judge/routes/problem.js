const express = require("express");
const router = express.Router();
const axios = require("axios");
const Submission = require("../models/submission");
const path = require("path");
const addSubmission = require("../judge");
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
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({ message: "Upload Failed. Try Again!!" });
    }

    axios
      .get(
        `${process.env.BACK_SERVER_URL}/api/problem/name/${req.body.problemName}`
      )
      .then((problemResponse) => {
        const problem = problemResponse.data;
        if (problem) {
          return res
            .status(409)
            .json({ message: "Problem with given name already exists!" });
        }
      })
      .catch((err) => {
        // console.log(err);

        let testCases = req.files.testcaseFile[0].buffer.toString();
        const solution = req.files.solutionFile[0].buffer.toString();

        let testLines = testCases.split("\n");
        for (let i = 0; i < testLines.length; i++) {
          testLines[i] = testLines[i].replace(/\r/, "").trim();
        }

        testCases = testLines.join("\n");
        testCases = testCases.split("Input").slice(1);

        let systemTestcases = [];

        try {
          testCases.forEach((curTest) => {
            const temp = curTest.split("Output");
            const curInput = temp[0].trim().replace(/[\r]+/gm, ""),
              curOutput = temp[1].trim().replace(/[\r]+/gm, "");

            systemTestcases.push({
              input: curInput,
              output: curOutput,
            });
          });
        } catch (error) {
          return res
            .status(400)
            .json({ message: "Incorrect TestFile Format!" });
        }

        const problem = {
          name: req.body.problemName,
          author: req.body.author,
          statement: req.body.problemStatement,
          sampleTestcases: JSON.parse(req.body.sampleTestcases),
          explanation: req.body.explanation,
          tags: JSON.parse(req.body.tags),
          systemTestcases: systemTestcases,
          time: req.body.time,
          memory: req.body.memory,
          countAC: 0,
          countTotal: 0,
        };

        const submission = new Submission({
          problemName: problem.name,
          code: solution,
          language: path
            .extname(req.files.solutionFile[0].originalname)
            .split(".")[1],
        });

        addSubmission(problem, submission, "submit", (err, result) => {
          if (err)
            return res
              .status(500)
              .json({ message: "Something Went Wrong! Try Again!!!" });

          let flag = false;

          result.every((curResult) => {
            let verdict;
            for (let key in curResult) {
              if (curResult[key] === true) {
                verdict = key;
              }
            }

            if (verdict !== "AC") {
              flag = true;
              return false;
            } else {
              return true;
            }
          });

          if (!flag) {
            return res.status(200).json({ problem: problem });
          } else {
            return res.status(500).json({ message: "Problem rejected." });
          }
        });
      });
  });
});

module.exports = router;
