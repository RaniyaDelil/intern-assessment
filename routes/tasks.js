const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const title = req.body.title;
    if (!title) {
      return res.json({error: "Please include a title"});
    }
    const task = await Task.create({title});
    res.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
  }
});

// Read a task

// Mark task as complete

// Update title of task

// Delete a task

// Get all tasks - list all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
});

// List all completed tasks

// List all pending tasks

module.exports = router;