const { z } = require("zod");

const listProgramsQuerySchema = z.object({
    country: z.string().trim().optional(),

    degreeLevel: z.string().trim().optional(),

    intake: z.string().trim().optional(),

    field: z.string().trim().optional(),

    q: z.string().trim().optional(),

    // Coerces string query ("50000") to non-negative number
    maxTuition: z.coerce
        .number({ invalid_type_error: "maxTuition must be a number" })
        .nonnegative("maxTuition cannot be negative")
        .optional(),

    // Preprocesses "true"/"false" strings to boolean
    scholarshipAvailable: z
        .preprocess((val) => {
            if (val === "true" || val === true) return true;
            if (val === "false" || val === false) return false;
            return val;
        }, z.boolean())
        .optional(),

    sortBy: z
        .enum(["tuitionAsc", "tuitionDesc", "relevance"])
        .default("relevance"),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce
        .number()
        .int()
        .positive()
        .max(50, "Limit cannot exceed 50")
        .default(10),
});

module.exports = { listProgramsQuerySchema };