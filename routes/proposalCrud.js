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
            // Generate proposalId
            const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
            
            // Find proposals created today
            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);
            const todayEnd = new Date();
            todayEnd.setHours(23, 59, 59, 999);

            const countToday = await Model.countDocuments({
                createdAt: { $gte: todayStart, $lte: todayEnd }
            });

            const sequence = (countToday + 1).toString().padStart(3, '0');
            const proposalId = `DGTQ-${dateStr}-${sequence}`;

            const newItem = new Model({
                ...req.body,
                proposalId
            });
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
