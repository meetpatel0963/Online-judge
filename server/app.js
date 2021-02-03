const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const problem = require("./routes/problem");
const submission = require("./routes/submission");
const createProblem = require("./routes/createProblem");
const user = require("./routes/user");
const auth = require("./routes/auth");
const cors = require("cors");

// Load config
dotenv.config({ path: "./config/config.env" });

// connect MongoDB
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//   exposedHeaders: "x-auth-token",
// };

app.use(cors());

app.use("/home/problem", problem);
app.use("/home/submission", submission);
app.use("/home/createProblem", createProblem);
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
