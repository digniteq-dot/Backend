const express = require('express');
const auth = require('../middleware/auth');

module.exports = function createCrudRouter(Model) {
    const router = express.Router();

    // GET all
    router.get('/', async (req, res) => {
        try {
            const items = await Model.find(req.query).sort({ order: 1, createdAt: -1 });
            res.json(items);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    // GET by ID
    router.get('/:id', async (req, res) => {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) return res.status(404).json({ message: 'Item not found' });
            res.json(item);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    // POST create
    router.post('/', auth, async (req, res) => {
        try {
            const newItem = new Model(req.body);
            const savedItem = await newItem.save();
            res.json(savedItem);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    // PUT update
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

    // DELETE
    router.delete('/:id', auth, async (req, res) => {
        try {
            const item = await Model.findById(req.params.id);
            if (!item) return res.status(404).json({ message: 'Item not found' });
            await item.deleteOne();
            res.json({ message: 'Item removed' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    return router;
};
