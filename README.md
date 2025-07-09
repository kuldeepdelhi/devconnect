# DevConnect 🧑‍💻

A full-stack developer network app where users can create profiles, showcase projects, search others by name or project, and leave feedback.

## 🌐 Live Demo (optional)
[Add your live site link here if hosted]

---

## 🏗️ Project Structure
devconnect/
├── client/ # React frontend
└── server/ # Express backend


---

## ⚙️ Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Token)

---

##  How to Run the App Locally

### Prerequisites

- Node.js and npm installed
- MongoDB running locally or a connection string from MongoDB Atlas
- Git installed

---

### 1. Clone the Repository

```bash
git clone https://github.com/kuldeepdelhi/devconnect.git
cd devconnect
cd server
npm install

## Create a .env file inside server/ with the following:

MONGO_URI=mongodb+srv://Peedluk12345:Peedluk12345@cluster0.mmegimw.mongodb.net/devconnect?retryWrites=true&w=majority
JWT_SECRET=KULDEEP
PORT=5000


##Start the backend server:
node server.js


##Setup the Frontend

cd ../client
npm install
Start the React app:


npm run dev

## Features
1. User Signup/Login with JWT Auth

2. Create and display projects
3.Search users or projects by name

4. View user profile and projects

5. Comment 
