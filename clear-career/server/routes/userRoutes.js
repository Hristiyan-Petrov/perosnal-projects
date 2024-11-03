const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:auth0Id', async (req, res) => {
    try {
        const { auth0Id } = req.params;
        const user = await User.findOne({ auth0Id });

        if (user) {
            res.json({ isNewUser: false, user });
        } else {
            res.json({ isNewUser: true });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error checking user', err })
    }
});

router.post('/set-role', async (req, res) => {
    const { auth0Id, role } = req.body;

        User.findOne({ auth0Id })
            .then(user => {
                if (!user) {
                    user = new User({ auth0Id, role, appliedOffers: [], postedOffers: [] });
                    user.save()
                        .then(response => {
                            res.json({ message: 'User role set successfully', user });
                        });
                } else {
                    res.status(400).json({ message: 'User already exists' });
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'Error setting user or its role', err });
            });
});

module.exports = router;