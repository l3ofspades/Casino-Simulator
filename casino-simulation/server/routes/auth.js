import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET ||"supersecretkey";

// User Registration
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log("Register request:", req.body);
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, passwordHash: hashed });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login request:", req.body);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) {
            return res.status(400).json({ message: "Invalid email or password" });
        }


        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({
  token,
  user: {
    _id: user._id,
    username: user.username,
    email: user.email,
    chips: user.chips
  }
});

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;