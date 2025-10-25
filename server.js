// server.js
const express = require("express");
const morgan = require("morgan"); // logging middleware
const app = express();
const PORT = 3000;

// ✅ Built-in Middleware: JSON body parser
app.use(express.json());

// ✅ Third-party Middleware: Morgan for logging
app.use(morgan("dev"));

// ✅ Custom Middleware (example: log request time)
app.use((req, res, next) => {
    console.log("Request Time:", new Date().toISOString());
    next(); // pass control to next middleware/route
});

// Sample data
let users = [
    { id: 1, name: "Manikanta" },
    { id: 2, name: "Rohan" }
];

// Routes
app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users", (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});