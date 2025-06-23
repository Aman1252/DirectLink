# DirectLink
# Realtime Peer-to-Peer Chat App

This is a real-time chat application built from scratch using Node.js, Socket.IO, React, and LowDB. It supports one-to-one messaging, online/offline status detection, and offline message storage with auto delivery when the user comes online.

---

# Features

- Real-time 1-on-1 chat using WebSockets (Socket.IO)
- Online/offline user indicators
- Send/receive messages
- Timestamps for messages
- Offline message storage and auto delivery
- Search users by name
- Profile panel with name, email, and mobile
- Responsive and clean UI with Tailwind CSS

---

# Tech Stack

| Frontend     | Backend       | Database     | Realtime         |
|--------------|---------------|--------------|------------------|
| React        | Node.js       | LowDB (JSON) | Socket.IO        |
| Vite         | Express.js    |              |                  |
| Tailwind CSS |               |              |                  |

---

# Getting Started

Backend setup
- cd backend
- npm install
- npm run dev

Frontend setup
- cd frontend
- npm install
- npm run dev

---

# How It Works

- When a user logs in, their email is sent via Socket.IO to the backend.
- The server tracks online users and broadcasts their status.
-When sending a message:
	- If the recipient is online → message delivered instantly via socket.
	- If the recipient is offline → message is stored in a JSON file via LowDB.
- Upon recipient reconnection, stored messages are delivered.

---

# Future Improvements

- Add login/signup with JWT authentication
- Chat history per user
- Support image/file sharing
- Group chat and media support
- Migrate to MongoDB/PostgreSQL for scalability
