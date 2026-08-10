const { z } = require('zod');

const roleEnum = z.enum(['student', 'counselor']);
const englishTestEnum = z.enum(['IELTS']);
const IntakeEnum = z.enum(["fall", "spring", "summer"]);

const registerSchema = z.object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters long'),
    email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email address'),

    password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters long'),
    role: roleEnum.default('student'),
    targetCountries: z
        .array(z.string().trim(), {
            required_error: 'Target countries are required'
        })
        .min(1, 'At least one target country is required'),

    interestedFields: z
        .array(z.string().trim(), {
            required_error: 'Interest fields are required'
        })
        .min(1, "Select at least one field of interest"),

    preferredIntake: IntakeEnum.optional(),
    maxBudgetUsd: z.coerce
        .number({ invalid_type_error: "Budget must be a number", required_error: "Maximum budget is required" })
        .nonnegative("Budget cannot be negative"),
    englishTest: z
        .object({
            exam: englishTestEnum,
            score: z.coerce.number().nonnegative().optional()
        })
        .optional()
});

const loginSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .email('Invalid email address'),
    password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters long')
})
module.exports = { registerSchema, loginSchema, roleEnum, englishTestEnum };
