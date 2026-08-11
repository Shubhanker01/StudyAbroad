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
    return res.status(201).json(new apiResponse(201, { id: newUser._id, email: newUser.email }, "User Registered Successfully!!"));
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
    const accessToken = user.generateAuthToken();
    if (!accessToken) {
      throw new HttpError(500, starterMessage("Some error occured in the server"));
    }
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    }
    return res.status(200).cookie('accessToken', accessToken, options).json(new apiResponse(200, { id: user._id, email: user.email }, "User logged In successfully!!!"));
  }

  throw new HttpError(400, starterMessage("Bad Request"));
});

const me = asyncHandler(async (req, res) => {
  return res.status(200).json(new apiResponse(200, req.user, "User details fetched successfully"))

});

module.exports = {
  register,
  login,
  me,
};
