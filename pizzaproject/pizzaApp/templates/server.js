
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let users = []; // list that contains users

// Register
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ name, email, password: hashedPassword });
    res.json({ message: "User registered!" });
});

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ email: user.email }, "secretkey", { expiresIn: "1h" });
    res.json({ token });
});

app.listen(5000, () => console.log("Server running on port 5000"));
