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
  if (user.role !== "student") {
    throw new HttpError(403, "Only students can create applications");
  }
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
    timeline: [{ status: "submitted", note: note || "Application created!!" }]
  })
  return res.status(201).json(new apiResponse(201, newApplication, "Application created successfully"));
});

const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;
  const user = req.user;
  // 1. Role Authorization Check
  if (user.role !== "counselor") {
    throw new HttpError(403, "Only counsellors can update application statuses");
  }
  const application = await Application.findById(id);
  if (!application) {
    throw new HttpError(404, "Application not found");
  }
  application.timeline.push({
    status,
    note,
    changedAt: new Date()
  })
  await application.save()
  return res
    .status(200)
    .json(new apiResponse(200, application, "Application status updated successfully"));
});

module.exports = {
  createApplication,
  listApplications,
  updateApplicationStatus,
};
