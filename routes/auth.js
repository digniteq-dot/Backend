const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Default Admin credentials (can be moved to DB or env variables)
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
// Default password is 'digniteq2024' hashed. Let's just compare raw if not using DB for users, or use simple matching.
const ADMIN_PASS = process.env.ADMIN_PASS || 'digniteq2026';

const { Setting } = require('../models/Content');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let setting = await Setting.findOne();
        
        let isValid = false;
        let validUsername = 'admin';

        if (setting) {
            // Check against Setting model
            if (username === setting.username) {
                const isMatch = await bcrypt.compare(password, setting.password);
                if (isMatch) {
                    isValid = true;
                    validUsername = setting.username;
                }
            }
        } else {
            // Fallback to hardcoded
            if (username === ADMIN_USER && password === ADMIN_PASS) {
                isValid = true;
                validUsername = ADMIN_USER;
            }
        }

        if (isValid) {
            const payload = {
                user: {
                    username: validUsername,
                    role: 'admin'
                }
            };

            const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret', { expiresIn: '7d' });
            
            res.json({ 
                token: accessToken, 
                refreshToken, 
                user: { username: validUsername } 
            });
        } else {
            res.status(400).json({ message: 'Invalid Credentials' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth/refresh
// @desc    Refresh access token
// @access  Public
router.post('/refresh', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret');
        const payload = {
            user: {
                username: decoded.user.username,
                role: decoded.user.role
            }
        };

        const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.json({ token: newAccessToken });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired refresh token' });
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
