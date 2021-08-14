const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const _ = require("lodash");

router.post("/", async (req, res) => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
  } catch (ex) {
    res.status(404).json({ message: "User Not Found..." });
  }

  if (user) {
    return res.status(400).json({ message: "User already registered..." });
  }

  let password = req.body.password;
  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  } catch (ex) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }

  user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    contact: req.body.contact,
    country: req.body.country,
    password: password,
    description: req.body.description,
  });

  jwt.sign(
    {
      user: _.pick(user, "_id"),
    },
    process.env.EMAIL_SECRET,
    (err, token) => {
      user
        .save()
        .then(() =>
          res
            .header("Access-Control-Expose-Headers", "x-auth-token")
            .header("x-auth-token", token)
            .send(user)
        )
        .catch((error) =>
          res.status(500).json({ message: "Something Went Wrong!" })
        );
    }
  );
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .select("-password")
    .then((user) => res.send(user))
    .catch((err) => res.status(404).json({ message: "User Not Found.." }));
});

module.exports = router;
