const asyncHandler = require("../utils/asyncHandler");
const HttpError = require("../utils/httpError");
const User = require("../models/Student");
const apiResponse = require("../utils/apiResponse");

function starterMessage(capability) {
  return `${capability} is intentionally left incomplete for the candidate assignment.`;
}

const register = asyncHandler(async (req, res) => {
  const { fullName, email, password, role, targetCountries, interestedFields, preferredIntake, maxBudgetUsd, englishTest } = req.body;
  // check for the existing user
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new HttpError(400, "User with this email already exists")
  }
  let newUser = await User.create({
    fullName,
    email,
    password,
    role,
    targetCountries,
    interestedFields,
    preferredIntake,
    maxBudgetUsd,
    englishTest
  });
  if (newUser) {
    return res.status(201).json(new apiResponse(201, "User registered successfully", { id: newUser._id, email: newUser.email }));
  }
  throw new HttpError(501, starterMessage("Some error occurred while registering the user"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(400, "User with this email does not exist")
  }
  let comparedPassword = await user.comparePassword(password);
  if (comparedPassword) {
    return res.status(200).json(new apiResponse(200, "User logged in successfully", { id: user._id, email: user.email }));
  }

  throw new HttpError(400, starterMessage("Bad Request"));
});

const me = asyncHandler(async (req, res) => {
  throw new HttpError(
    501,
    starterMessage("Fetching the authenticated user profile")
  );
});

module.exports = {
  register,
  login,
  me,
};
