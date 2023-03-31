const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single user
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Create a user
router.post('/add', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// login
router.post('/login', async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    const user_login_status = await User.find(user);
    if (user_login_status == null) {
        return res.status(404).json({ message: 'Cannot find user' });
    }
    res.json(user_login_status);
});

// Update a user
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }

    if (req.body.email != null) {
        res.user.email = req.body.email;
    }

    if (req.body.password != null) {
        res.user.password = req.body.password;
    }

    res.user.updated_at = Date.now();

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'Deleted user' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get a single user by ID
async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id);

        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }

        res.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;