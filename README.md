# Casino Simulator  
### Full-Stack MERN Web App  
Built and designed by **Jonathan Federico Martinez**

---

## Overview  
Casino Simulator is a full-stack web application where users can log in, play interactive casino-style games (Roulette, Poker, etc.), manage virtual chips, and view their game history — all stored in MongoDB.

This project demonstrates complete MERN engineering with clean architecture and modern React state management.

---

## Features  
- **User Authentication** – Secure login/registration using JWT + bcrypt  
- **Protected Routes** – Only logged-in users can access game history  
- **Persistent Sessions** – Token stored locally for smooth UX  
- **Roulette Simulation** – Real-time win/loss logic + chip updates  
- **Game History Tracking** – Every play saved to MongoDB  
- **Responsive UI** – Mobile + desktop support  
- **Context API Architecture** – Organized, scalable state management  

---

## Tech Stack  
**Frontend:** React, Context API, Axios, CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)  
**Auth:** JWT, bcrypt  
**Version Control:** Git + GitHub

---

## Folder Structure
```
Casino-Simulator/
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── package.json
│
├── package.json
├── .gitignore
└── README.md
```

---

## Installation & Setup  

### 1. Clone the repo
```bash
git clone https://github.com/l3ofspades/Casino-Simulator.git
cd Casino-Simulator
```

### 2. Install dependencies
#### Install backend dependencies:
```bash
cd server
npm install
```

#### Install frontend dependencies:
```bash
cd ../client
npm install
```

### 3. Set up environment variables
Create a `.env` file inside the **server** folder:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the backend
```bash
cd server
npm run dev
```

### 5. Run the frontend
```bash
cd ../client
npm run dev
```

Then open the local address shown in the terminal (usually `http://localhost:5173`).

---

## Learning Highlights  
- Full MERN authentication flow (JWT + bcrypt)  
- Using React Context for global state management  
- Writing protected routes with react-router-dom  
- Persisting data via Express + MongoDB  
- Git best practices: proper .gitignore, clean repo structure

---

## Author  
**Jonathan Federico Martinez**  
Full-Stack MERN Developer  
Email: jonathanfederico13@gmail.com  
LinkedIn: https://www.linkedin.com/in/jonathan-martinez-a9970b1a6  
GitHub: https://github.com/l3ofspades

---

## Future Enhancements  
- Add Blackjack and Poker modules  
- Add player leaderboard  
- Cloud persistence for chip balance  
- Deploy using Render/Vercel + MongoDB Atlas
