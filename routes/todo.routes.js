import express from "express";
import Todo from "../models/todo.model.js";
import { verifyToken } from '../middleware/auth.middleware.js';
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from '../controllers/todo.controller.js';


const router = express.Router();

router.post('/', verifyToken, createTodo);
router.get('/', verifyToken, getTodos);
router.put('/:id', verifyToken, updateTodo);
router.delete('/:id', verifyToken, deleteTodo);

// Create new todo

// Get all todos
router.get("/", verifyToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(todos);
  } catch (err) {
    console.error("Get todos error:", err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// Update todo
router.put("/:id", verifyToken, async (req, res) => {
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
router.delete("/:id", verifyToken, async (req, res) => {
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
