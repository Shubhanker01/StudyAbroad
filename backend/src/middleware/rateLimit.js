const { rateLimit } = require("express-rate-limit");

// Strict limiter for authentication / sensitive endpoints
const rateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 5, // Limit each IP to 5 failed/login requests per hour
    message: {
        status: 429,
        message: "Too many login attempts. Please try again after an hour.",
    },
});

module.exports = rateLimiter;