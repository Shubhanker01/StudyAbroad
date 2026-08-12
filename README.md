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
<img width="1366" height="768" alt="Screenshot (218)" src="https://github.com/user-attachments/assets/01f00443-3f65-4691-8634-0db855319b38" />
<img width="1366" height="768" alt="Screenshot (217)" src="https://github.com/user-attachments/assets/e13d6cc7-e7f5-4f9a-b38f-f1846bb17558" />
<img width="1366" height="768" alt="Screenshot (216)" src="https://github.com/user-attachments/assets/ac6de0cd-3a66-4598-b254-97bc625f868b" />
<img width="1366" height="768" alt="Screenshot (215)" src="https://github.com/user-attachments/assets/2b68cd5a-28fc-4cba-ba10-10a7103c438a" />


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
