const express = require('express');
const auth = require('../middleware/auth');

module.exports = function createProposalRouter(Model) {
    const router = express.Router();

    // GET all proposals (auth required)
    router.get('/', auth, async (req, res) => {
        try {
            const items = await Model.find().sort({ createdAt: -1 });
            res.json(items);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    // GET proposal by ID (auth required)
    router.get('/:id', auth, async (req, res) => {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) return res.status(404).json({ message: 'Proposal not found' });
            res.json(item);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    // POST create proposal (PUBLIC - no auth required)
    router.post('/', async (req, res) => {
        try {
            const newItem = new Model(req.body);
            const savedItem = await newItem.save();
            res.json(savedItem);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    // PUT update proposal (auth required)
    router.put('/:id', auth, async (req, res) => {
        try {
            const updatedItem = await Model.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.json(updatedItem);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    // DELETE proposal (auth required)
    router.delete('/:id', auth, async (req, res) => {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) return res.status(404).json({ message: 'Proposal not found' });
            await item.deleteOne();
            res.json({ message: 'Proposal removed' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    return router;
};
