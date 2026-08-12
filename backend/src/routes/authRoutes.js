const express = require("express");

const { login, me, register } = require("../controllers/authController");
const { requireAuth } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../schemas/authSchema");
const rateLimiter = require("../middleware/rateLimit");

const router = express.Router();

router.post("/register", rateLimiter, validate(registerSchema), register);
router.post("/login", rateLimiter, validate(loginSchema), login);
router.get("/me", requireAuth, me);

module.exports = router;
