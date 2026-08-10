const request = require("supertest");
const app = require("../app"); // Your Express app setup
const User = require("../models/Student");

// Mock the Mongoose User model
jest.mock("../models/Student");

describe("POST /api/auth/login", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear call counts and mock state between tests
    });

    const validLoginPayload = {
        email: "shub@gmail.com",
        password: "Password123",
    };

    test("1. Success - Should log in successfully and return 200 with user data", async () => {
        // 1. Create a mock user object with comparePassword instance method
        const mockUserInstance = {
            _id: "60d5ecb8b5c9c22b1c8e4567",
            email: "shub@gmail.com",
            comparePassword: jest.fn().mockResolvedValue(true),
        };

        // 2. Mock User.findOne to return our mock user instance
        User.findOne.mockResolvedValue(mockUserInstance);

        // 3. Send request via Supertest
        const res = await request(app)
            .post("/api/auth/login")
            .send(validLoginPayload);

        expect(res.statusCode).toBe(200);
        expect(User.findOne).toHaveBeenCalledWith({ email: "shub@gmail.com" });
        expect(mockUserInstance.comparePassword).toHaveBeenCalledWith("Password123");

        // Check custom apiResponse body structure
        expect(res.body.statusCode || res.body.status).toBe(200);
        expect(res.body.data).toEqual("User logged in successfully");
    });

    test("2. Error 400 - Should throw error when user with email does not exist", async () => {
        // Mock User.findOne to return null
        User.findOne.mockResolvedValue(null);

        const res = await request(app)
            .post("/api/auth/login")
            .send(validLoginPayload);

        expect(res.statusCode).toBe(400);
        expect(User.findOne).toHaveBeenCalledWith({ email: "shub@gmail.com" });
        expect(res.body.message).toMatch(/User with this email does not exist/i);
    });

    test("3. Error 400 - Should throw error when password comparison fails", async () => {
        // Mock user instance where password check returns false
        const mockUserInstance = {
            _id: "60d5ecb8b5c9c22b1c8e4567",
            email: "shub@gmail.com",
            comparePassword: jest.fn().mockResolvedValue(false),
        };

        User.findOne.mockResolvedValue(mockUserInstance);

        const res = await request(app)
            .post("/api/auth/login")
            .send(validLoginPayload);

        expect(res.statusCode).toBe(400);
        expect(mockUserInstance.comparePassword).toHaveBeenCalledWith("Password123");
    });
});