const { z } = require("zod");
const { applicationStatuses } = require("../config/constants");
// Helper regex to validate MongoDB ObjectId
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const createApplicationSchema = z.object({
    program: z
        .string({
            required_error: "Program ID is required",
        })
        .trim()
        .regex(objectIdRegex, { message: "Invalid Program ID format" }),

    university: z
        .string({
            required_error: "University ID is required",
        })
        .trim()
        .regex(objectIdRegex, { message: "Invalid University ID format" }),

    destinationCountry: z
        .string({
            required_error: "Destination country is required",
        })
        .trim()
        .min(2, { message: "Destination country must be at least 2 characters" })
        .max(100, { message: "Destination country must not exceed 100 characters" }),

    intake: z
        .string({
            required_error: "Intake is required",
        })
        .trim()
        .min(3, { message: "Intake must be specified (e.g., 'Fall 2026', 'Spring 2027')" }),

    note: z
        .string()
        .trim()
        .max(500, { message: "Note cannot exceed 500 characters" })
        .optional(),
});

const updateStatusSchema = z.object({
    status: z.enum(applicationStatuses, {
        errorMap: () => ({ message: "Invalid application status" }),
    }),
    note: z
        .string()
        .trim()
        .max(500, { message: "Note cannot exceed 500 characters" })
        .optional(),
});

module.exports = { createApplicationSchema, updateStatusSchema }