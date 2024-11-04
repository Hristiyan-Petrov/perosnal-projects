const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/:auth0Id', async (req, res) => {
    const { auth0Id } = req.params;
    const user = await User.findOne({ auth0Id })?.lean();
    if (user) {
        res.json(user);
    } else {
        res.status(400).json({ message: 'No such user' });
    }
});

router.post('/create', async (req, res) => {
    const { auth0Id } = req.body;

    User.findOne({ auth0Id })
        .then(user => {
            if (!user) {
                user = new User({ auth0Id, role: null, appliedOffers: [], postedOffers: [] });
                user.save()
                    .then(userData => {
                        res.json({ message: 'User profile created successfully', user: userData });
                    });
            } else {
                res.status(400).json({ message: 'User already exists' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error setting user or its role', err });
        });
});

router.post('/set-role', async (req, res) => {
    // TODO: Add jwt creation in this action (jwt.sign)
    // TODO: add auth middleware

    const { auth0Id, role } = req.body;

    User.updateOne({ auth0Id }, { $set: { role } })
        .then(user => {
            // Check if a document was actually found and updated
            if (user.modifiedCount == 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'Role set successfully' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: err });
        });
});

module.exports = router;