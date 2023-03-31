const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Get all todos
router.post('/', async (req, res) => {
    const querObject = {
        user_id: req.body.user_id
    };
    try {
        const todos = await Todo.find(querObject);
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single todo
router.get('/:id', getTodo, (req, res) => {
    res.json(res.todo);
});

// Create a todo
router.post('/add', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        user_id: req.body.user_id
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json({ message: "Todo added successfully!" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a todo
router.patch('/:id', getTodo, async (req, res) => {
    if (req.body.title != null) {
        res.todo.title = req.body.title;
    }

    if (req.body.description != null) {
        res.todo.description = req.body.description;
    }

    if (req.body.completed != null) {
        res.todo.completed = req.body.completed;
    }

    res.todo.updated_at = Date.now();

    try {
        const updatedTodo = await res.todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a todo
router.delete('/delete/:id', getTodo, async (req, res) => {
    try {
        const todos = await Todo.findByIdAndRemove(req.params.id);
        res.json({ message: 'Todo deleted successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get a single todo by ID
async function getTodo(req, res, next) {
    try {
        const todo = await Todo.findById(req.params.id);

        if (todo == null) {
            return res.status(404).json({ message: 'Cannot find todo' });
        }

        res.todo = todo;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;