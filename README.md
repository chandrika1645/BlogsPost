

# **BlogsPost** 📝

**BlogsPost** is a modern blogging platform built with **React.js** for the frontend and **Express.js** for the backend, utilizing **MongoDB** as the database. The system provides full authentication, blog post management, commenting, and a responsive UI for an enhanced user experience.

---

## 📑 **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Security](#security)
- [Screenshots](#screenshots)
- [Demo Video](#demo-video)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Error Handling](#error-handling)
- [Technologies Used](#technologies-used)

---

## 🚀 **Project Overview**

BlogsPost is a **feature-rich blogging platform** allowing users to **create, read, update, and delete** blog posts. With **JWT** authentication, a **commenting system**, and **seamless API communication**, BlogsPost is built to provide a **secure**, **scalable**, and **intuitive experience** for both content creators and readers.

---

## 🛠️ **Features**

### **Backend:**

- **User Authentication:** Secure signup and login using JWT.
- **Blog Post Management:** Full CRUD operations for blog posts.
- **Comment System:** Users can add and view comments on blog posts.
- **Database Integration:** Data stored in MongoDB for easy scalability.
- **Authentication Middleware:** Protects sensitive routes.
- **Environment Variables:** Sensitive data like JWT secrets managed via dotenv.
- **Data Validation:** Ensures data integrity with Zod.

### **Frontend:**

- **User Authentication Pages:** Easy-to-use signup and login pages.
- **Blog Post Pages:** Includes home page, single post view, and CRUD operations.
- **Comment Section:** Adds interactivity with user comments.
- **API Integration:** Axios handles smooth communication with the backend.
- **State Management:** Managed using React Context and hooks.
- **Responsive UI:** Fully mobile-optimized interface for all devices.
- **Toast Notifications:** Inform users about real-time events like successful actions.

---

## 🔐 **Security**

- **JWT Authentication:** Ensures secure communication and user sessions.
- **Password Hashing:** Safely stores passwords using bcrypt.
- **CORS Handling:** Secures cross-origin requests.
- **Middleware Protection:** All critical routes are protected with authentication.

---

## 📸 **Screenshots**

- **Login Page:**
 <img src="https://raw.githubusercontent.com/chandrika1645/Blogspost/main/screenshots/login-page.png" width="500">
  
- **Sign-Up Page:**
<img src="https://raw.githubusercontent.com/chandrika1645/BlogsPost/main/screenshots/sign-up-page.png" width="500">

- **Toast Notifications:**
<img src="https://raw.githubusercontent.com/chandrika1645/Blogspost/main/screenshots/toast-notifications.png" width="500">

---

## 🎬 **Demo Video**

Watch the full demo video of the BlogsPost platform in action!  

<a href="https://drive.google.com/file/d/1Wn0wvVGPQLmot5mZghTZQa-cOCbRPeh-/view">
    <img src="https://github.com/chandrika1645/BlogsPost/blob/main/demoVideo.gif" width="500">
</a>



---

## 🛠️ **Backend Setup**

### **Prerequisites:**

- Node.js
- MongoDB

### **Steps to Run the Backend:**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/chandrika1645/BlogsPost.git
   ```

2. **Navigate to the Backend Directory:**
   ```bash
   cd server
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Configure Environment Variables:**

   Create a `.env` file and add the following:

   ```bash
   JWT_SECRET=your-secret-key
   MONGO_URI=your-mongodb-uri
   ```

5. **Start the Backend Server:**
   ```bash
   npm start
   ```

   The backend will now be accessible at `http://localhost:8080`.

---

## 🖥️ **Frontend Setup**

### **Prerequisites:**

- Node.js
- React.js

### **Steps to Run the Frontend:**

1. **Navigate to the Frontend Directory:**
   ```bash
   cd client
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Frontend Application:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`.

---

## ⚠️ **Error Handling**

The backend is equipped with structured error handling to return appropriate responses.

### **Example Error Response:**

```json
{
  "error": "Invalid Credentials",
  "status": 401
}
```

---

## 🧑‍💻 **Technologies Used**

### **Backend:**

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database for storing blog data
- **JWT Authentication** - Secure authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management

### **Frontend:**

- **React.js** - Frontend JavaScript library
- **Axios** - HTTP client for API requests
- **React Hooks** - For efficient state management

---

**BlogsPost** is designed to be a **secure**, **scalable**, and **responsive** blogging platform with an **intuitive user experience** for all.

---

Feel free to personalize the README further, especially with images, badges, and any other interactive content you'd like to include!
