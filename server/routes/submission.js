const express = require("express");
const router = express.Router();
const Problem = require("../models/problem");
const Submission = require("../models/submission");
const addSubmission = require("../judge/judge");
const User = require("../models/user");
const auth = require("../middleware/auth");

router.post("/", (req, res) => {
  const solution = {
    problemName: req.body.problemName,
    code: req.body.code,
    lang: req.body.lang,
    userId: req.body.userId,
    verdict: "",
  };

  const op = req.body.operation;

  let submission = new Submission(solution);

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

          for (key in curResult) {
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

router.put("/", auth, async (req, res) => {
  const problemName = req.body.problemName;
  const finalResult = req.body.finalResult;
  const difficulty = req.body.difficulty;
  let newProblem;

  try {
    newProblem = await Problem.findOne({ name: problemName });
    newProblem.countTotal += 1;

    let ok = true;
    finalResult.map((curResult) => {
      ok &= curResult.verdict === "AC";
    });

    if (ok) {
      newProblem.countAC += 1;
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong! Please try again!" });
  }

  Problem.findOneAndUpdate({ name: problemName }, newProblem, {
    new: true,
  })
    .then((result) => {
      const userId = req.body.userId;

      User.findById(userId)
        .then((user) => {
          let verdicts = [];
          finalResult.map((curResult) => {
            verdicts.push(curResult.verdict);
          });

          if (verdicts.includes("CE")) user.stats["CECount"] += 1;
          else if (verdicts.includes("MLE")) user.stats["MLECount"] += 1;
          else if (verdicts.includes("TLE")) user.stats["TLECount"] += 1;
          else if (verdicts.includes("RTE")) user.stats["RTECount"] += 1;
          else if (verdicts.includes("WA")) user.stats["WACount"] += 1;
          else if (verdicts.includes("AC")) user.stats["ACCount"] += 1;

          user.stats["totalCount"] += 1;
          user.stats[difficulty] += 1;

          User.findOneAndUpdate({ _id: userId }, user, {
            new: true,
          })
            .then((ress) => res.send(ress))
            .catch((err) => res.send(err));
        })
        .catch((err) => res.status(404).json({ message: "User Not Found..." }));
    })
    .catch((err) => {
      console.log(1);
      res.status(404).json({ message: "Problem Not Found..." });
    });
});

router.get("/:userId", (req, res) => {
  Submission.find({ userId: req.params.userId, verdict: "AC" })
    .then((submissions) => {
      let problemsTemp = [];
      submissions.map((curSubmission) => {
        if (!problemsTemp.includes(curSubmission.problemName))
          problemsTemp.push(curSubmission.problemName);
      });
      Problem.find({ name: { $in: problemsTemp } })
        .then((problems) => {
          let tags = {};
          problems.map((curProblem) => {
            curProblem.tags.map((curTag) => {
              if (tags[curTag]) tags[curTag] += 1;
              else tags[curTag] = 1;
            });
          });

          res.send(tags);
        })
        .catch((err) =>
          res.status(404).json({ message: "Problem Not Found..." })
        );
    })
    .catch((err) =>
      res.status(404).json({ message: "Submissions Not Found..." })
    );
});

router.get("/usersubmission/:userId", (req, res) => {
  Submission.find({ userId: req.params.userId })
    .sort({ date: -1 })
    .then((submissions) => res.send(submissions))
    .catch((err) => res.status(404).json({ message: "User Not Found..." }));
});

module.exports = router;
