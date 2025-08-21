// middleware/auth.js
import jwt from "jsonwebtoken"; //5:04:09

const authUser = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodeToken.id; // ✅ correct place to store userId

    if (!req.userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized! Login Again" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
