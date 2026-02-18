import express from "express";
import Todo from "../models/todo.model.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Create new todo
router.post("/", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.create({
      userId: req.user.id,
      text: req.body.text,
      completed: false
    });

    res.status(201).json(todo);
  } catch (err) {
    console.error("Create todo error:", err);
    res.status(500).json({ message: "Error creating task" });
  }
});

// Get todos for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id })
      .sort({ createdAt: -1 }); // Newest first by default

    res.json(todos);
  } catch (err) {
    console.error("Get todos error:", err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// Update todo
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update todo error:", err);
    res.status(500).json({ message: "Error updating task" });
  }
});

// Delete todo
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Delete todo error:", err);
    res.status(500).json({ message: "Error deleting task" });
  }
});

export default router;
