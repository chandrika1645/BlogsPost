# BlogsPost

BlogsPost is a modern blogging platform built with React.js for the frontend and Express.js for the backend, utilizing MongoDB as the database. The system provides full authentication, blog post management, commenting, and a responsive UI for an enhanced user experience.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Security](#security)
- [Screenshots](#screenshots)
- [Demo Video](#demo-video)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Error Handling](#error-handling)
- [Technologies Used](#technologies-used)

## Project Overview

BlogsPost is a blogging platform that allows users to create, read, update, and delete blog posts. It supports user authentication using JWT and provides a commenting feature. The backend is built with Express.js and MongoDB, while the frontend is developed using React.js. Axios is used for API communication. The system is designed for security, scalability, and an intuitive user experience.

## Features

### Backend:

- **User Authentication:** Signup and login functionality using JWT.
- **Blog Post Management:** CRUD operations for blog posts.
- **Comment System:** Users can add comments to blog posts.
- **Database Integration:** Uses MongoDB for data storage.
- **Authentication Middleware:** Protects routes and ensures only authenticated users can access certain features.
- **Environment Variables:** dotenv is used to manage sensitive data like JWT secrets and database connection strings.
- **Data Validation:** Zod library is used for data validation to ensure consistency and security.

### Frontend:

- **User Authentication Pages:** Signup and login pages.
- **Blog Post Pages:** Includes home page, single post page, post creation page, and post editing page.
- **Comment Section:** Allows users to add comments on blog posts.
- **API Integration:** Axios is used to communicate with the backend for all operations.
- **State Management:** React Context and react hooks.
- **Responsive UI:** Mobile-friendly and accessible UI design.
- **Toast Notifications:** Toast is used for displaying real-time notifications to users.

## Security

- **JWT Authentication:** Protects user sessions and ensures secure API communication.
- **Password Hashing:** Uses bcrypt to store passwords securely.
- **CORS Handling:** Implemented to manage cross-origin requests securely.
- **Middleware Protection:** Routes are secured using authentication middleware.

## Screenshots
- **login page**
https://github.com/chandrika1645/Blogspost/blob/main/screenshots/login-page.png
- **Sign-up page**
https://github.com/chandrika1645/BlogsPost/blob/main/screenshots/sign-up-page.png
- **Toast notifications**
https://github.com/chandrika1645/BlogsPost/blob/main/screenshots/toast-notifications.png
## Demo Video

[[Demo Video](https://github.com/your-repo-name/assets/12345678/example-image.png)](https://drive.google.com/file/d/1Wn0wvVGPQLmot5mZghTZQa-cOCbRPeh-/view?usp=drive_link)



## Backend Setup

### Prerequisites:

- Node.js
- MongoDB

### Steps to Run the Backend:

1. Clone the repository:
   ```sh
   git clone https://github.com/chandrika1645/BlogsPost.git
   ```
2. Navigate to the backend directory:
   ```sh
   cd server
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Configure environment variables in a `.env` file:
   ```sh
   JWT_SECRET=your-secret-key
   MONGO_URI=your-mongodb-uri
   ```
5. Start the backend server:
   ```sh
   npm start
   ```
   The backend will be accessible at `http://localhost:8080`.

## Frontend Setup

### Prerequisites:

- Node.js
- react.js 

### Steps to Run the Frontend:

1. Navigate to the frontend directory:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend application:
   ```sh
   npm run dev
   ```
   The frontend will be accessible at `http://localhost:3000`.

## Error Handling

The backend includes structured error handling for different scenarios, returning appropriate HTTP status codes and messages.

### Example Error Response:

```json
{
  "error": "Invalid Credentials",
  "status": 401
}
```

## Technologies Used

### Backend:

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt
- dotenv

### Frontend:

- React.js
- Axios
- React hooks

BlogsPost is designed to be a secure and scalable blogging platform, ensuring an intuitive experience for both readers and content creators.

