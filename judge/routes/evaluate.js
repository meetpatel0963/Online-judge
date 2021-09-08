const express = require("express");
const router = express.Router();
const addSubmission = require("../judge");

router.post("/", auth, (req, res) => {
  const solution = {
    problemName: req.body.problemName,
    code: req.body.code,
    lang: req.body.lang,
    userId: req.body.userId,
    verdict: "",
  };

  const op = req.body.operation;

  let submission = new Submission(solution);

  console.log(submission);

  Problem.findOne({ name: req.body.problemName })
    .then((problem) => {
      addSubmission(problem, submission, op, (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Something Went Wrong! Try Again!!!" });

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

        if (op === "submit")
          return submission
            .save()
            .then(() => res.send({ finalResult }))
            .catch((error) =>
              res.status(500).json({ message: "Something Went Wrong!" })
            );
        else return res.send({ finalResult });
      });
    })
    .catch((err) => res.status(404).json({ message: "Problem Not Found..." }));
});
