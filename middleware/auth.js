const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // first, we get token from header's key "x-auth-token"
  const token = req.header("x-auth-token");

  // then, check if there is no token
  if (!token) {
    return res.status(401).json({ msg: "No token, auth denied" });
  }

  // verify the token
  try {
    // VV the line below decodes the token VV
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // VV the request contains the user object with id (which i set in the users.js) VV
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
