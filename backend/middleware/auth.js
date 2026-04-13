const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.json({ error: "No token" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret123");
    req.user = decoded;
    next();
  } catch (err) {
    return res.json({ error: "Invalid token" });
  }
}

module.exports = auth;