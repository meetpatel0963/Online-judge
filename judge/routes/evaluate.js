const express = require("express");
const axios = require("axios");
const router = express.Router();
const addSubmission = require("../judge");
const auth = require("../middleware/auth");
const Submission = require("../models/submission");

router.post("/", auth, (req, res) => {
  const solution = {
    problemName: req.body.problemName,
    code: req.body.code,
    language: req.body.language,
    verdict: "",
  };

  const operation = req.body.operation;

  let submission = new Submission(solution);

  console.log(submission);

  axios
    .get(`${process.env.BACK_SERVER_URL}/api/problem/${req.body.problemId}`)
    .then((problemResponse) => {
      const problem = problemResponse.data;
      addSubmission(problem, submission, operation, (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "Something Went Wrong! Try Again!!!" });
        }

        let finalResult = [];
        let verdicts = [],
          testcases = [];

        console.log(result);

        result.forEach((curResult) => {
          let newResult = {},
            curTestcase = {
              time: curResult.time,
              memory: curResult.memory,
            };

          for (let key in curResult) {
            if (curResult[key] !== false) {
              newResult[key] = curResult[key];
            }
            if (curResult[key] === true) {
              newResult["verdict"] = key;
              curTestcase["verdict"] = key;
              verdicts.push(key);
            }
          }
          testcases.push(curTestcase);
          finalResult.push(newResult);
        });

        submission.result = testcases;

        if (verdicts.includes("CE")) submission.verdict = "CE";
        else if (verdicts.includes("MLE")) submission.verdict = "MLE";
        else if (verdicts.includes("TLE")) submission.verdict = "TLE";
        else if (verdicts.includes("RTE")) submission.verdict = "RTE";
        else if (verdicts.includes("WA")) submission.verdict = "WA";
        else if (verdicts.includes("AC")) submission.verdict = "AC";

        console.log(submission.verdict, finalResult);

        return res.send({ verdict: submission.verdict, result: finalResult });
      });
    })
    .catch((err) => res.status(404).json({ message: "Problem Not Found..." }));
});

module.exports = router;
