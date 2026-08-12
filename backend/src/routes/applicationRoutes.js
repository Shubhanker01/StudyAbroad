const express = require("express");
const { requireAuth } = require("../middleware/auth");
const {
  createApplication,
  listApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");
const { validate } = require("../middleware/validate");
const { createApplicationSchema, updateStatusSchema } = require("../schemas/applicationSchema");
const rateLimiter = require("../middleware/rateLimit");
const router = express.Router();

router.get("/", listApplications);
router.post("/", rateLimiter, requireAuth, validate(createApplicationSchema), createApplication);
router.patch("/:id/status", rateLimiter, requireAuth, validate(updateStatusSchema), updateApplicationStatus);

module.exports = router;
