const express = require('express');
const auth = require('../middleware/auth');

module.exports = function createSingleItemRouter(Model, defaultData = {}) {
    const router = express.Router();

    // GET the single item
    router.get('/', async (req, res) => {
        try {
            let item = await Model.findOne();
            // If doesn't exist, create it with default data
            if (!item) {
                item = new Model(defaultData);
                await item.save();
            }
            res.json(item);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    // PUT update the single item
    router.put('/', auth, async (req, res) => {
        try {
            let item = await Model.findOne();
            if (!item) {
                item = new Model(req.body);
                await item.save();
                return res.json(item);
            }

            const updatedItem = await Model.findByIdAndUpdate(
                item._id,
                { $set: req.body },
                { new: true }
            );
            res.json(updatedItem);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    return router;
};
