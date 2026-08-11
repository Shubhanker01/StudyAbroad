const { z } = require("zod");

const listUniversitiesQuerySchema = z.object({
    country: z.string().trim().optional(),
    partnerType: z.string().trim().optional(),
    q: z.string().trim().optional(),

    // Coerces string query values ("true"/"false") directly into booleans
    scholarshipAvailable: z
        .preprocess((val) => {
            if (val === "true" || val === true) return true;
            if (val === "false" || val === false) return false;
            return val;
        }, z.boolean())
        .optional(),

    sortBy: z.enum(["name", "ranking", "popular"]).default("popular"),
    // Auto-coerces string queries ("1", "10") to numbers with bounds enforcement
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce
        .number()
        .int()
        .positive()
        .max(50, "Limit cannot exceed 50")
        .default(10),
});

module.exports = { listUniversitiesQuerySchema };