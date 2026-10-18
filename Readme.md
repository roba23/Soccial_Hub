# SocialHub

**SocialHub** is a simple, real-time social networking website built with **Node.js, Express, Socket.io, and MongoDB**. It enables users to securely authenticate, manage a friends list by sending and receiving friend requests, and exchange text messages in real-time.

---

## 🚀 Features

*   **Secure Authentication:** User signup and login powered by **Passport.js** and managed via secure cookies.
*   **Friend Request System:** Send, receive, accept, or decline friend requests with real-time status updates.
*   **Real-Time Messaging:** Instant chat messaging between friends using **Socket.io**.
*   **Data Persistence:** Chat histories, user credentials, and friendship records securely stored in **MongoDB**.

---

## 🛠️ Tech Stack

*   **Backend:** Node.js, Express
*   **Real-Time:** Socket.io
*   **Database:** MongoDB (with Mongoose)
*   **Authentication:** Passport.js (Local Strategy) & Cookie-session

---

## ⚙️ Prerequisites

Make sure you have the following installed on your machine:
*   [Node.js](https://nodejs.org) (v16+ recommended)
*   [MongoDB](https://mongodb.com) (Local instance or MongoDB Atlas URL)
*   [Nodemon](https://npmjs.com) installed globally (or locally as a dev dependency)

---

## 📥 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd social_hub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory of your project and configure the following variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/social_hub
   COOKIE_SECRET=your_random_secret_string_here
   ```

4. **Start the server:**
   *   For production/normal execution:
       ```bash
       node index.js
       ```
   *   For development (auto-restarts on changes using Nodemon):
       ```bash
       nodemon index.js
       ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

---
