const request = require("supertest");
const app = require("../app");
const User = require("../models/Student");

// Mock the Mongoose User model methods
jest.mock("../models/Student");

describe("POST /api/auth/register", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear call counts between tests
    });

    const validPayload = {
        fullName: "Shub Thapa",
        email: "shub@gmail.com",
        password: "Password123",
        role: "student",
        targetCountries: ["Canada"],
        interestedFields: ["Science"],
        preferredIntake: "fall",
        maxBudgetUsd: 4000,
        englishTest: {
            exam: "IELTS",
            score: 7.5,
        },
    };

    test("1. Success - Should register a new user and return 201", async () => {
        // Mock User.findOne to return null (User does not exist yet)
        User.findOne.mockResolvedValue(null);

        // Mock User.create to return mock database document
        User.create.mockResolvedValue({
            _id: "60d5ecb8b5c9c22b1c8e4567",
            ...validPayload,
        });

        const res = await request(app)
            .post("/api/auth/register")
            .send(validPayload);

        expect(res.statusCode).toEqual(201);
        // expect(res.body.status).toBe("success");
        expect(User.findOne).toHaveBeenCalledWith({ email: "shub@gmail.com" });
        expect(User.create).toHaveBeenCalledTimes(1);
    });

    test("2. Validation Error - Should return 500 when Zod validation fails (missing fields)", async () => {
        const invalidPayload = {
            email: "shub@gmail.com",
            // missing password, fullName, etc.
        };

        const res = await request(app)
            .post("/api/auth/register")
            .send(invalidPayload);

        expect(res.statusCode).toEqual(500);
        // expect(res.body.status).toBe("fail");
        // Database should not be queried if Zod fails
        expect(User.findOne).not.toHaveBeenCalled();
        expect(User.create).not.toHaveBeenCalled();
    });

    test("3. Conflict Error - Should return 400 if user email already exists", async () => {
        // Mock User.findOne to return an existing user document
        User.findOne.mockResolvedValue({
            _id: "60d5ecb8b5c9c22b1c8e4567",
            email: "shub@gmail.com",
        });

        const res = await request(app)
            .post("/api/auth/register")
            .send(validPayload);

        expect(res.statusCode).toEqual(400);
        expect(User.create).not.toHaveBeenCalled();
    });
});