# Casino Simulation (MERN Stack)

A full-stack casino simulation web application featuring Blackjack, Poker, and Roulette, complete with user authentication, chip management, and persistent game history.

This project demonstrates real-world full-stack development practices, including secure authentication, RESTful APIs, cloud database integration, and production deployment.

---

## Live Demo

Frontend (Live App):  
https://casino-frontend-seoi.onrender.com

Backend API:  
https://casino-backend-n7hd.onrender.com

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Context API
- Custom CSS styling

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT Authentication

### Deployment & Infrastructure
- Render (Web Service + Static Site)
- MongoDB Atlas
- GitHub (CI/CD)

---

## Features

- User registration and login with JWT authentication
- Protected routes for authenticated users
- Casino games:
  - Blackjack
  - Poker
  - Roulette
- Chip wallet with persistent balance
- Game history saved to MongoDB
- Client-side routing with refresh-safe navigation
- Production-ready environment configuration

---

## Deployment

This application is deployed as a full-stack production system using Render and MongoDB Atlas, with the frontend and backend hosted as separate services.

### Backend (API Server)
- Deployed as a Render Web Service
- Runs continuously in production
- Handles authentication, chip management, and game history
- Connects securely to MongoDB Atlas via environment variables

Backend environment variables:
- MONGO_URI
- JWT_SECRET
- FRONTEND_URL

The backend automatically redeploys on pushes to the main branch.

---

### Frontend (Client Application)
- Deployed as a Render Static Site
- Built with Vite and served via a global CDN
- Communicates with the backend via environment-based API configuration

Frontend environment variable:
- VITE_BACKEND_API_URL

Client-side routing is supported via rewrite rules to prevent 404 errors on page refresh.

---

## What This Project Demonstrates

- Full-stack MERN architecture
- Secure authentication and authorization
- Separation of concerns between frontend and backend
- Production deployment and environment configuration
- Debugging real-world deployment issues
- Cloud database integration

---

## Notes

This project was built as a capstone to demonstrate end-to-end application development, from local development to live production deployment.

---

## Final Checklist

- Backend deployed and connected to MongoDB Atlas
- Frontend deployed and connected to backend
- Authentication working in production
- Protected routes enforced
- Refresh-safe client-side routing
- README updated for submission
