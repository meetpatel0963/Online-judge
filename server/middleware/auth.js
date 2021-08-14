const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (token === "null")
    return res.status(400).json({
      message: "Access denied. No token provided.",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({
      message: "This is an error!",
    });
  }
};
