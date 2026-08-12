# StudyAbroadHQ - Study Abroad Management System

A full-stack web application designed to simplify international education applications, offer AI-powered program recommendations, and track application lifecycles in real time.

---

## 🚀 Features Added

* **Gemini AI Recommendation System**: Enhanced the pre-existing program recommendation API with Google Gemini AI to analyze candidate profile matches and generate personalized fit summaries and top picks.
* **Zod Input Validation**: Robust request body and parameter validation for API endpoints to ensure strict data sanitization and type safety.
* **Redis Caching**: Implemented Redis cache layer to store frequent analytical queries (such as dashboard metrics) for near-instant response times.
* **Express Rate Limiting**: Added `express-rate-limit` middleware across APIs to prevent brute-force attacks and control API resource consumption.
* **Modified & Enhanced APIs**: Optimized existing backend endpoints for smooth integration with frontend views and real-time dashboard aggregation.
* **Interactive Frontend Authentication & Dashboard**: Built dynamic landing, login, registration, and student dashboard views using React, Tailwind CSS, and Shadcn UI components.
* **Test Cases**: Two test cases added for Authentication endpoints.

---

## 🛠️ Setup Instructions

### Prerequisites
* **Node.js**: `v18.x` or higher
* **MongoDB**: Local or Atlas instance
* **Redis**: Local server or Redis Cloud instance

### 1. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run dev

### 2. Frontend Setup
```bash
# open a new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev

## Screenshots
<img width="1366" height="768" alt="Screenshot (218)" src="https://github.com/user-attachments/assets/b0c272fa-4343-472c-88aa-63eb2efd7a9a" />
<img width="1366" height="768" alt="Screenshot (217)" src="https://github.com/user-attachments/assets/7180a31d-eda9-4d74-b320-6ad9c027490d" />
<img width="1366" height="768" alt="Screenshot (216)" src="https://github.com/user-attachments/assets/670d09b9-a934-4978-aa9e-2e227073ee11" />
<img width="1366" height="768" alt="Screenshot (215)" src="https://github.com/user-attachments/assets/f187eb6c-af68-4913-b3ec-955f38a59c5c" />

## Environment Configuration
PORT=5000
MONGODB_URL=mongodb://localhost:27017/studyabroad
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Redis Config
REDIS_URL=redis://127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=
CACHE_TTL=3600

# AI Configuration
GEMINI_API_KEY=your_google_gemini_api_key

Project Assumptions
Simplified User Registration: On the frontend UI, all user registrations currently default to the student role to keep the onboard workflow streamlined.
Strict API Response Compatibility: Gemini AI integration was incorporated exclusively into the program recommendation module, ensuring complete backward compatibility with the exact JSON API contract provided in the original assignment specification.
