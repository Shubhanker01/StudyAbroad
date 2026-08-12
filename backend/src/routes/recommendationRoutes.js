const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { getRecommendations } = require("../controllers/recommendationController");

const router = express.Router();
const rateLimiter = require("../middleware/rateLimit");
router.get("/:studentId", rateLimiter, requireAuth, getRecommendations);

module.exports = router;
