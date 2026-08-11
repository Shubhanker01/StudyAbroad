const Application = require("../models/Application");
const asyncHandler = require("../utils/asyncHandler");
const HttpError = require("../utils/httpError");
const apiResponse = require("../utils/apiResponse");

const listApplications = asyncHandler(async (req, res) => {
  const { studentId, status } = req.query;
  const filters = {};

  if (studentId) {
    filters.student = studentId;
  }

  if (status) {
    filters.status = status;
  }

  const applications = await Application.find(filters)
    .populate("student", "fullName email role")
    .populate("program", "title degreeLevel tuitionFeeUsd")
    .populate("university", "name country city")
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    data: applications,
  });
});

const createApplication = asyncHandler(async (req, res) => {
  const { program, university, destinationCountry, intake, note } = req.body;
  const user = req.user;
  // find for duplicate application for the same program and university by the same student
  const existingApplication = await Application.findOne({
    student: user._id,
    program,
    university
  })
  if (existingApplication) {
    throw new HttpError(400, "You have already applied for this program at this university");
  }
  const newApplication = await Application.create({
    student: user._id,
    program,
    university,
    destinationCountry,
    intake,
    timeline: [{ status: "draft", note: note || "Application created!!" }]
  })
  return res.status(201).json(new apiResponse(true, newApplication, "Application created successfully"));
});

const updateApplicationStatus = asyncHandler(async (req, res) => {
  throw new HttpError(
    501,
    "Application status transitions are intentionally incomplete for the assignment."
  );
});

module.exports = {
  createApplication,
  listApplications,
  updateApplicationStatus,
};
