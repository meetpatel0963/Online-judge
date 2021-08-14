const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");

const problem = require("./routes/problem");
const submission = require("./routes/submission");
const user = require("./routes/user");
const auth = require("./routes/auth");

// Load config
dotenv.config({ path: "./config/config.env" });

// connect MongoDB
connectDB();

const app = express();

// Body parser
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 })
);

app.use(cors());

app.use("/home/problem", problem);
app.use("/home/submission", submission);
app.use("/home/user", user);
app.use("/home/auth", auth);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
