# EventHorizon Authentication API

A RESTful authentication API built with Node.js, Express, MongoDB, and Mongoose. It supports user registration, password hashing, email verification, JWT-based authentication, and protected user profile access.

## Live Demo

**Base URL:** https://eventhorizon-api-ew2c.onrender.com

## Features

* User registration with Joi request validation
* Secure password hashing with bcrypt
* Email verification using time-sensitive verification tokens
* Login restricted to verified accounts
* JSON Web Token (JWT) authentication
* Protected user profile endpoint
* MongoDB database integration using Mongoose
* Environment-based configuration for sensitive settings

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas
* **ODM:** Mongoose
* **Validation:** Joi
* **Password hashing:** bcrypt
* **Authentication:** JSON Web Tokens (JWT)
* **Email delivery:** Google Apps Script and Gmail
* **Deployment:** Render

## API Endpoints

| Method | Endpoint                             | Description                               | Authentication     |
| ------ | ------------------------------------ | ----------------------------------------- | ------------------ |
| GET    | `/`                                  | Check API availability                    | No                 |
| POST   | `/api/auth/register`                 | Register a new user                       | No                 |
| GET    | `/api/auth/verify-email?token=TOKEN` | Verify a user's email                     | Verification token |
| POST   | `/api/auth/login`                    | Log in a verified user                    | No                 |
| GET    | `/api/user/profile`                  | Retrieve the authenticated user's profile | Bearer JWT         |

### 1. Check API Status

**Request**

`GET /`

Returns a message confirming that the API is running.

### 2. Register a User

**Request**

`POST /api/auth/register`

Example request body:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "TestPass123"
}
```

The API validates the input, hashes the password, stores the new user, and sends an email containing a verification link.

### 3. Verify Email

**Request**

`GET /api/auth/verify-email?token=YOUR_VERIFICATION_TOKEN`

The verification token is generated during registration and expires after one hour. Successful verification marks the account as verified and invalidates the token.

### 4. Log In

**Request**

`POST /api/auth/login`

Example request body:

```json
{
  "email": "test@example.com",
  "password": "TestPass123"
}
```

Only verified users with valid credentials can log in. Successful authentication returns a JWT that expires after one hour.

### 5. Get User Profile

**Request**

`GET /api/user/profile`

Include the JWT returned during login in the request header:

`Authorization: Bearer YOUR_JWT_TOKEN`

The endpoint returns the authenticated user's profile.

## Getting Started Locally

### Prerequisites

* Node.js and npm
* A MongoDB database
* A Gmail account and configured Google Apps Script email service

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Boluwatife-max/eventhorizon-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd eventhorizon-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and configure the required environment variables.

5. Start the development server:

   ```bash
   npm run dev
   ```

The local server uses port `4567` by default.

## Environment Variables

Configure the following variables in your local `.env` file and deployment environment.

| Variable                | Purpose                                        |
| ----------------------- | ---------------------------------------------- |
| `PORT`                  | Server port; defaults to `4567` locally        |
| `MONGO_URI`             | MongoDB connection string                      |
| `JWT_SECRET`            | Secret used to sign authentication JWTs        |
| `VERIFICATION_BASE_URL` | Base URL used to generate verification links   |
| `EMAIL_BRIDGE_URL`      | Google Apps Script web app URL                 |
| `EMAIL_BRIDGE_SECRET`   | Shared secret used to authorize email requests |

Never commit your `.env` file, database credentials, JWT secret, or email bridge secret to GitHub.

## Security Considerations

* Passwords are hashed before being stored.
* Registration and login requests are validated.
* Email verification tokens expire after one hour and are cleared after successful verification.
* Unverified users cannot log in.
* Protected routes require a valid JWT.
* Secrets and connection strings are supplied through environment variables.

## Deployment

The API is deployed on Render and uses MongoDB Atlas for database storage. Email verification messages are sent through a Google Apps Script web app using Gmail.

## Known Issue

The deployed verification link has triggered a Chrome Safe Browsing warning during testing. This issue is under investigation. Do not bypass browser security warnings when accessing the verification link.

## Author

**Boluwatife Balogun**

GitHub: [Boluwatife-max](https://github.com/Boluwatife-max)

---

