# Casino Simulator  
### Full-Stack MERN Web App  
Built and designed by **Jonathan Federico Martinez**

---

## Overview  
Casino Simulator is a full-stack web application where users can log in, play interactive casino-style games (such as Roulette and Poker), manage virtual chips, and view their game history — all saved securely in a MongoDB database.  

This project demonstrates full-stack engineering using the MERN stack (MongoDB, Express, React, Node.js) and modern front-end state management.

---

## Features  
- User Authentication – Secure registration/login using JWT and bcrypt  
- Protected Routes – Users must be logged in to view game history  
- Persistent Sessions – Token and user data stored locally  
- Roulette Simulation – Real-time game with win/loss logic and chip tracking  
- Game History – Auto-logs every play result to MongoDB  
- Responsive UI – Works on desktop and mobile  
- Clean Architecture – Context API, modular routes, reusable components  

---

## Tech Stack  
**Frontend:** React, Context API, Axios, CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB / Mongoose  
**Auth:** JWT (JSON Web Token), bcrypt  
**Version Control:** Git / GitHub  

---

## Folder Structure
```
Casino-Simulator/
├── server/
│   ├── models/
│   ├── routes/
│   ├── server.js
│
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   └── App.jsx
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
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the `server` folder:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the backend
```bash
cd server
npm start
```

### 5. Run the frontend
```bash
cd ..
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Learning Highlights  
- Full MERN authentication flow (JWT + bcrypt)  
- React Context for global state (auth + chips)  
- Protected routes with react-router-dom  
- Data persistence through Express + MongoDB  
- Git best practices: .gitignore, node_modules cleanup  

---

## Author  
**Jonathan Federico Martinez**  
Full-Stack MERN Developer  
Email: [jonathanfederico13@gmail.com](mailto:jonathanfederico13@gmail.com)  
LinkedIn: [https://www.linkedin.com/in/jonathan-martinez-a9970b1a6](https://www.linkedin.com/in/jonathan-martinez-a9970b1a6)  
GitHub: [https://github.com/l3ofspades](https://github.com/l3ofspades)

---

## Future Enhancements  
- Add Blackjack and Poker modules  
- Leaderboard with top player statistics  
- Cloud persistence for chip balances  
- Live deployment using Render or Vercel with MongoDB Atlas
