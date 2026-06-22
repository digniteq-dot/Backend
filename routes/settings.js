const express = require('express');
const router = express.Router();
const { Setting } = require('../models/Content');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const upload = require('./upload'); // Use existing upload if possible, or just accept URL strings. For now we will accept URL strings in body

// @route   GET api/settings
// @desc    Get global settings
// @access  Public (for logo/branding) or Private (for sensitive)
router.get('/', async (req, res) => {
    try {
        let setting = await Setting.findOne();
        if (!setting) {
            // Create default if not exists
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('digniteq2026', salt);
            setting = new Setting({
                password: hashedPassword
            });
            await setting.save();
        }
        
        // Return settings without password
        const { password, ...safeSettings } = setting.toObject();
        res.json(safeSettings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/settings
// @desc    Update global settings
// @access  Private
router.put('/', auth, async (req, res) => {
    const { 
        username, 
        password, 
        companyName, 
        tagline, 
        contactEmail, 
        contactPhone, 
        facebook, 
        instagram, 
        twitter, 
        linkedin, 
        logoUrl 
    } = req.body;

    try {
        let setting = await Setting.findOne();
        if (!setting) {
            setting = new Setting();
        }

        if (username) setting.username = username;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            setting.password = await bcrypt.hash(password, salt);
        }
        if (companyName !== undefined) setting.companyName = companyName;
        if (tagline !== undefined) setting.tagline = tagline;
        if (contactEmail !== undefined) setting.contactEmail = contactEmail;
        if (contactPhone !== undefined) setting.contactPhone = contactPhone;
        if (facebook !== undefined) setting.facebook = facebook;
        if (instagram !== undefined) setting.instagram = instagram;
        if (twitter !== undefined) setting.twitter = twitter;
        if (linkedin !== undefined) setting.linkedin = linkedin;
        if (logoUrl !== undefined) setting.logoUrl = logoUrl;

        await setting.save();
        
        const { password: _, ...safeSettings } = setting.toObject();
        res.json(safeSettings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
