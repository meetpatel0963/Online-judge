const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.header("Authorizarion");

  if (!token.startsWith("Bearer "))
    return res.status(500).json({
      message: "Access denied!",
    });

  token = token.slice(7);

  if (token === "")
    return res.status(500).json({
      message: "Access denied!",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(500).json({
      message: "Access denied!",
    });
  }
};
