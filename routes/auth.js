const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Default Admin credentials (can be moved to DB or env variables)
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
// Default password is 'digniteq2024' hashed. Let's just compare raw if not using DB for users, or use simple matching.
const ADMIN_PASS = process.env.ADMIN_PASS || 'digniteq2026';

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Simple hardcoded check for MVP, can upgrade to DB model if needed
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        const payload = {
            user: {
                username: ADMIN_USER,
                role: 'admin'
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { username: ADMIN_USER } });
            }
        );
    } else {
        res.status(400).json({ message: 'Invalid Credentials' });
    }
});

// @route   GET api/auth/me
// @desc    Get logged in user
// @access  Private
const auth = require('../middleware/auth');
router.get('/me', auth, async (req, res) => {
    try {
        res.json({ user: req.user.user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
