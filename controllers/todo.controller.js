// controllers/todo.controller.js
import Todo from '../models/todo.model.js';

// Create Todo
export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // ✅ userId MUST come from JWT
    const userId = req.user.sub || req.user.id;

    const todo = await Todo.create({
      title,
      userId
    });

    res.status(201).json(todo);
  } catch (err) {
    console.error('Create todo error:', err);
    res.status(500).json({ message: 'Failed to create todo' });
  }
};

// Get Todos for logged-in user
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.sub })
      .sort({ createdAt: -1 });

    // ✅ NORMALISE FOR ANGULAR
    res.status(200).json(
      todos.map(t => ({
        id: t._id.toString(),
        title: t.title,
        completed: t.completed,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt
      }))
    );

  } catch (err) {
    console.error("Get Todos error:", err);
    res.status(500).json({ message: "Server error fetching todos" });
  }
};

// Update Todo
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      todo
    });
  } catch (err) {
    console.error("Update Todo error:", err);
    res.status(500).json({ message: "Server error updating todo" });
  }
};

// Delete Todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error("Delete Todo error:", err);
    res.status(500).json({ message: "Server error deleting todo" });
  }
};
