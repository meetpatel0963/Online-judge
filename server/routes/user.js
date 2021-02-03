const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const _ = require("lodash");

let host;

async function sendMail(toEmail, link) {
  try {
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();
    console.log("accessToken: ", accessToken);
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_ID,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: toEmail,
      subject: "Please confirm your Email account",
      html:
        "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css'></head><body><!DOCTYPE html><html lang='en'><head><title>Salted | A Responsive Email Template</title><meta charset='utf-8'><meta name='viewport' content='width=device-width'> <style type='text/css'> #outlook a { padding: 0; } .ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; } img { -ms-interpolation-mode: bicubic; } body { margin: 0; padding: 0; } img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; } table { border-collapse: collapse !important; } body { height: 100% !important; margin: 0; padding: 0; width: 100% !important; } /* iOS BLUE LINKS */ .appleBody a { color: #68440a; text-decoration: none; } .appleFooter a { color: #999999; text-decoration: none; } @media screen and (max-width: 525px) { table[class='wrapper'] {width: 100% !important;}td[class='logo'] {text-align: left;padding: 20px 0 20px 0 !important;}td[class='logo'] img {margin: 0 auto !important;} /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */ td[class='mobile-hide'] { display: none; } img[class='mobile-hide'] { display: none !important; } img[class='img-max'] { max-width: 100% !important; height: auto !important; } /* FULL-WIDTH TABLES */ table[class='responsive-table'] { width: 100% !important; } /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */ td[class='padding'] { padding: 10px 5% 15px 5% !important; } td[class='padding-copy'] { padding: 10px 5% 10px 5% !important; text-align: center; } td[class='padding-meta'] { padding: 30px 5% 0px 5% !important; text-align: center; } td[class='no-pad'] { padding: 0 0 20px 0 !important; } td[class='no-padding'] { padding: 0 !important; } td[class='section-padding'] { padding: 50px 15px 50px 15px !important; } td[class='section-padding-bottom-image'] { padding: 50px 15px 0 15px !important; } /* ADJUST BUTTONS ON MOBILE */ td[class='mobile-wrapper'] { padding: 10px 5% 15px 5% !important; } table[class='mobile-button-container'] { margin: 0 auto; width: 100% !important; } a[class='mobile-button'] { width: 80% !important; padding: 15px !important; border: 0 !important; font-size: 16px !important; } } </style> </head> <body style='margin: 0; padding: 0;'> <!-- HEADER --> <table border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td bgcolor='#ffffff'> <div align='center' style='padding: 0px 15px 0px 15px;'> <table border='0' cellpadding='0' cellspacing='0' width='500' class='wrapper'> <!-- LOGO/PREHEADER TEXT --> <tr> <td style='padding: 20px 0px 30px 0px;' class='logo'> <table border='0' cellpadding='0' cellspacing='0' width='100%'> <tr> <td bgcolor='#ffffff' width='100' align='left'><a href='http://alistapart.com/article/can-email-be-responsive/' target='_blank'><img alt='Logo' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/48935/logo.jpg' width='52' height='78' style='display: block; font-family: Helvetica, Arial, sans-serif; color: #666666; font-size: 16px;' border='0'></a></td> <td bgcolor='#ffffff' width='400' align='right' class='mobile-hide'> <table border='0' cellpadding='0' cellspacing='0'> <tr> <td align='right' style='padding: 0 0 5px 0; font-size: 14px; font-family: Arial, sans-serif; color: #666666; text-decoration: none;'> <span style='color: #666666; text-decoration: none;'>Welcome to Online Judge!!</span></td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </div> </td> </tr> </table> <!-- ONE COLUMN SECTION --> <table border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td bgcolor='#ffffff' align='center' style='padding: 70px 15px 70px 15px;' class='section-padding'> <table border='0' cellpadding='0' cellspacing='0' width='500' class='responsive-table'> <tr> <td> <table width='100%' border='0' cellspacing='0' cellpadding='0'> <tr> <td> <!-- HERO IMAGE --> <table width='100%' border='0' cellspacing='0' cellpadding='0'> <tbody> <tr> <td class='padding-copy'> <table width='100%' border='0' cellspacing='0' cellpadding='0'> <tr> <td> <a href='#' target='_blank'><img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/48935/responsive-email.jpg' width='500' height='200' border='0' alt='Can an email really be responsive?' style='display: block; padding: 0; color: #666666; text-decoration: none; font-family: Helvetica, arial, sans-serif; font-size: 16px; width: 500px; height: 200px;' class='img-max'></a> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> <tr> <td> <!-- COPY --> <table width='100%' border='0' cellspacing='0' cellpadding='0'> <tr> <td align='center' style='font-size: 25px; font-family: Helvetica, Arial, sans-serif; color: #333333; padding-top: 30px;' class='padding-copy'>Wowwee! Thanks for registering an account with Online Judge! </td> </tr> <tr> <td align='center' style='padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;' class='padding-copy'>You're the coolest person in all the land (and I've met a lot of really cool people). </td> </tr> <tr> <td align='center' style='padding: 20px 0 0 0; font-size: 16px; line-height: 25px; font-family: Helvetica, Arial, sans-serif; color: #666666;' class='padding-copy'> Before we get started, we'll need to verify your email.</td> </tr> </table> </td> </tr> <tr> <td> <!-- BULLETPROOF BUTTON --> <table width='100%' border='0' cellspacing='0' cellpadding='0' class='mobile-button-container'> <tr> <td align='center' style='padding: 25px 0 0 0;' class='padding-copy'> <table border='0' cellspacing='0' cellpadding='0' class='responsive-table'> <tr> <td align='center'><a href='" +
        link +
        "' target='_blank' style='font-size: 16px; font-family: Helvetica, Arial, sans-serif; font-weight: normal; color: #ffffff; text-decoration: none; background-color: #5D9CEC; border-top: 15px solid #5D9CEC; border-bottom: 15px solid #5D9CEC; border-left: 25px solid #5D9CEC; border-right: 25px solid #5D9CEC; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; display: inline-block;' class='mobile-button'>Verify Email &rarr;</a> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </body> </html> <!-- partial --> <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script></body></html>",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

router.post("/", async (req, res) => {
  let user;
  try {
    user = await User.findOne({ email: req.body.email });
  } catch (ex) {
    res.status(404).json({ message: "User Not Found..." });
  }

  if (user) {
    if (user.confirmed)
      return res.status(400).json({ message: "User already registered..." });
    else {
      try {
        await User.deleteOne({ email: req.body.email });
      } catch (ex) {
        res.status(404).json({ message: "User Not Found..." });
      }
    }
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
    password: password,
    description: req.body.description,
  });

  jwt.sign(
    {
      user: _.pick(user, "_id"),
    },
    process.env.EMAIL_SECRET,
    (err, token) => {
      // NodeMailer
      console.log(token);
      host = req.get("host");

      const toEmail = req.body.email;
      const link = "http://" + req.get("host") + "/home/user/verify/" + token;

      sendMail(toEmail, link)
        .then(async (result) => {
          console.log("Result: ", result);
          try {
            await user.save();
            res.send(user);
          } catch (ex) {
            res.status(500).json({ message: "Something Went Wrong!" });
          }
        })
        .catch((error) => console.log("Error: ", error.message));
    }
  );
});

router.get("/verify/:token", async (req, res) => {
  console.log(req.protocol + "://" + req.get("host"));
  console.log("http://" + host);
  console.log(req.params.token);
  if (req.protocol + "://" + req.get("host") === "http://" + host) {
    console.log("Domain is matched. Information is from Authentic email");
    try {
      const decoded = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
      console.log(decoded);
      console.log("email is verified");
      console.log("ID", decoded.user._id);
      await User.updateOne({ _id: decoded.user._id }, { confirmed: true });
    } catch (ex) {
      res.status(500).json({ message: "Something Went Wrong!" });
    }
    return res.redirect("http://localhost:3000/signIn");
  } else {
    res.end("<h1>Request is from unknown source");
  }
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .select("-password")
    .then((user) => res.send(user))
    .catch((err) => res.status(404).json({ message: "User Not Found.." }));
});

module.exports = router;
