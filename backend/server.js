// 1. Load environment variables
require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

const Task = require('./models/Task');

// 3. Use Environment Variable for MongoDB Connection
// The actual string will be stored in Render's dashboard, not here.
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.log("MongoDB Connection Error:", err));

// 4. Use Render's dynamic PORT
// Render automatically assigns a port; process.env.PORT captures it.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Get all tasks - Fixed the undefined variable
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 }); 
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add task
app.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update task - Good logic, added error handling
app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete task - Good logic
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
