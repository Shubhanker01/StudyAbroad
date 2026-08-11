const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const asyncHandler = require("../utils/asyncHandler");
const HttpError = require("../utils/httpError");
const env = require('../config/env')

const requireAuth = asyncHandler(async (req, res, next) => {

  const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "").trim();
  if (!token) {
    throw new HttpError(401, "Authentication token is missing");
  }
  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const student = await Student.findById(decoded._id).select("-password");
    if (!student) {
      throw new HttpError(401, "Authenticated user no longer exists.");
    }
    req.user = student;
    next();
  } catch (error) {
    throw new HttpError(401, "Invalid or expired token.");
  }
});

module.exports = {
  requireAuth,
};
