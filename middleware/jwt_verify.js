const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const seecure_urls = ["/add_dealer", "/check"];
const verifyToken = (url) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    try {
      const decoded = jwt.verify(authHeader, JWT_SECRET);
      req.user = decoded;
      if (req.user.role === "dealer" && seecure_urls.includes(url)) {
        return res.status(403).json({
          message: "Forbidden: Dealers are not allowed to access this route.",
        });
      }
      next();
    } catch (error) {
      console.log("error here", error);

      return res
        .status(403)
        .json({ message: "Forbidden: Invalid or expired token" });
    }
  };
};
module.exports = verifyToken;
