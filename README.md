# Notes-app

📝 Notes App
A simple, scalable, and aesthetic full-stack MERN application for creating, managing, and organizing notes. This project was built to demonstrate core full-stack development skills, including REST API design, user authentication with JWT, and a responsive frontend built with React and Material UI.

Tech stack ->
Frontend: React 18 (Vite), Material UI, react-router-dom, axios
Backend: Node.js, Express, Mongoose (MongoDB)
Database: MongoDB Atlas (cloud)
Auth: JWT (jsonwebtoken), bcryptjs for password hashing
Dev tooling: nodemon (backend dev), vite (frontend dev)

project-root/
├─ backend/
│  ├─ package.json
│  ├─ .env.example
│  ├─ server.js
│  ├─ config/db.js
│  ├─ models/
│  │   ├─ User.js
│  │   └─ Note.js
│  ├─ routes/
│  │   ├─ auth.js
│  │   └─ notes.js
│  ├─ middleware/
│  │   └─ auth.js
│  └─ utils/
│      └─ validate.js
└─ frontend/
   ├─ package.json
   ├─ vite.config.js
   ├─ index.html
   ├─ src/
       ├─ main.jsx
       ├─ App.jsx
       ├─ api.js
       ├─ pages/Login.jsx
       ├─ pages/Register.jsx
       ├─ pages/Dashboard.jsx
       ├─ components/NoteCard.jsx
       └─ utils/auth.js


✨ Features
🔐 User Authentication: Secure user registration and login functionality using JSON Web Tokens (JWT).

🛡️ Protected Routes: Dashboard and note management routes are protected and only accessible to authenticated users.

✍️ Full CRUD Functionality: Create, Read, Update, and Delete notes with a clean and intuitive interface.

🏷️ Tagging & Filtering: Organize notes with tags and easily filter them.

🔍 Dynamic Search: Instantly search through notes by title or content.

📱 Responsive Design: A clean, responsive layout built with Material UI that works on all devices.

🔒 Secure Backend: Includes password hashing (bcryptjs) and both client-side and server-side validation.




Prerequisites ->
Node.js v16+ (v18 recommended)
npm

Step To Run ->
1. Clone Repo :
 git clone <repo-url>
cd project-root

2. Backend Setup :
    cd backend
# install dependencies
npm install

3.start Backend:
npm start

*** if successfully setup is done after running commands in 3.***
 Attempting to connect to MongoDB...
MongoDB connected
Server started on port 5001


4.Frontend Setup
cd frontend
npm install

# start dev server
npm run dev

5. ApI DOCUMENTATION(quick reference )
   
Base URL: http://localhost:<PORT>/api (PORT = backend port, e.g. 5001)
Auth
POST /api/auth/register
Body JSON: { "name": "User", "email": "u@x.com", "password": "secret123" }
Success: 200 { token, user } (user excludes password)
POST /api/auth/login
Body JSON: { "email": "u@x.com", "password": "secret123" }
Success: 200 { token, user }
GET /api/auth/me
Header: Authorization: Bearer <token>
Success: 200 user object
Notes (protected — require Authorization header)
POST /api/notes
Body: { "title":"T", "content":"...", "tags":["a","b"] }
Response: created note
GET /api/notes?q=<text>&tag=<tag>
List notes for user. q searches title/content; tag filters by tag
GET /api/notes/:id
Single note
PUT /api/notes/:id
Body: fields to update → returns updated note
DELETE /api/notes/:id
Deletes note






