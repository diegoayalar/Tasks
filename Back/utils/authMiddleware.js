const jwt = require("jsonwebtoken");

const protectRoute = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ status: "error", message: "Unauthorized: Missing token" });
  }

  try {
    // Verify the token using the JWT secret from the environment variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token to the request object for further use
    req.user = decoded;

    // Call the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ status: "error", message: "Unauthorized: Invalid token" });
  }
};

module.exports = protectRoute;
