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
casino-simulation/
├── .gitignore
├── README.md
├── __mocks__
│   └── fileMock.js
├── babel.config.cjs
├── eslint.config.js
├── index.html
├── jest.config.cjs
├── jest.dom.setup.js
├── jest.env.setup.js
├── jest.setup.js
├── package-lock.json
├── package.json
├── public
│   ├── Wheel.png
│   └── vite.svg
├── server
│   ├── .env
│   ├── middleware
│   │   └── auth.js
│   ├── models
│   │   ├── GameHistory.js
│   │   └── User.js
│   ├── routes
│   │   └── auth.js
│   └── server.js
├── src
│   ├── App.jsx
│   ├── __tests__
│   │   ├── Blackjack.test.jsx
│   │   ├── Home.test.jsx
│   │   ├── authRoutes.test.js
│   │   ├── blackjackUtils.test.js
│   │   ├── chipUtils.test.js
│   │   ├── pokerUtils.test.js
│   │   └── rouletteLogic.test.js
│   ├── api
│   │   └── auth.js
│   ├── assets
│   │   ├── animations.css
│   │   ├── buttons.css
│   │   ├── card-back.png
│   │   ├── index.css
│   │   ├── layout.css
│   │   ├── tables.css
│   │   └── theme.css
│   ├── components
│   │   ├── Blackjack.jsx
│   │   ├── ChipWallet.jsx
│   │   ├── Game.jsx
│   │   ├── Poker.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Roulette.jsx
│   │   └── common
│   │       ├── GameSelect.jsx
│   │       └── PlayAgain.jsx
│   ├── context
│   │   ├── AuthContext.jsx
│   │   └── ChipContext.jsx
│   ├── main.jsx
│   ├── pages
│   │   ├── BlackjackPage.jsx
│   │   ├── GameHistoryPage.jsx
│   │   ├── Home.jsx
│   │   ├── LoginPage.jsx
│   │   ├── PokerPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── RoulettePage.jsx
│   ├── services
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── historyService.js
│   ├── setupTests.js
│   └── utils
│       ├── blackjackUtils.js
│       ├── chipUtils.js
│       ├── pokerUtils.js
│       └── rouletteLogic.js
└── vite.config.js
```

---

## Installation & Setup  

### 1. Clone the repo
```bash
git clone https://github.com/l3ofspades/Casino-Simulator.git
cd Casino-Simulator/casino-simulation
```

### 2. Install dependencies
```bash
npm install
cd server && npm install
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
cd ..
npm run dev
```

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
- Player leaderboard  
- Live deployment with MongoDB Atlas  
