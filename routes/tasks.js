const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const title = req.body.title;

    // check if title included
    if (!title) {
      return res.status(400).json({error: "Please include a title"});
    }

    // create task
    const task = await Task.create({title});
    res.json(task);

  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Mark task as complete
router.patch("/tasks/:id/complete", async (req, res) => {
  try {
    const taskId = req.params.id;
    
    // check if task exists
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({error: "Task not found"});
    }

    // update completed
    task.completed = true;
    await task.save();
    res.json(task);
    
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update title of task
router.put("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const title = req.body.title;
    
    // check if task exists
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({error: "Task not found"});
    }

    // update title
    task.title = title;
    await task.save();
    res.json(task);

  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    
    // check if task exists
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({message: "Task not found"});
    }

    // delete task
    await task.destroy();
    res.json({message: "Task deleted"});

  } catch (error) {
    console.error("Error deleting tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all tasks - list all tasks
router.get("/tasks", async (req, res) => {
  try {
    // display all tasks
    const tasks = await Task.findAll();
    res.json(tasks);

  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// List all completed tasks
router.get("/tasks/completed", async (req, res) => {
  try {
    // display all tasks where completed = true
    const tasks = await Task.findAll({where: {completed: true}});
    res.json(tasks);
    
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// List all pending tasks
router.get("/tasks/pending", async (req, res) => {
  try {
    // display all tasks where completed = false
    const tasks = await Task.findAll({where: {completed: false}});
    res.json(tasks);

  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read a task
router.get("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    // check if task exists
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({error: "Task not found"});
    }

    // display task
    res.json(task);
    
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;