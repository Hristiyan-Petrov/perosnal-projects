const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.get('/:auth0Id', async (req, res) => {
    const { auth0Id } = req.params;
    const user = await userService.getOne(auth0Id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'No such user' });
    }
});

// For Auth callback specific
router.get('/:auth0Id/initial', async (req, res) => {
    const { auth0Id } = req.params;
    const user = await userService.getOne(auth0Id);
    if (user) {
        res.json(user);
    } else {
        // Not throwing 4xx code to not break client logic
        res.json({ initialLogin: true });
    }
});

router.get('/:auth0Id/role', async (req, res) => {
    const { auth0Id } = req.params;
    userService.getRole(auth0Id)
        .then(role => {
            res.json(role);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ message: `Role of ${auth0Id} not found` });
        });
});

router.post('/create', async (req, res) => {
    const { auth0Id, email } = req.body;
    userService.getOne(auth0Id)
        .then(user => {
            if (!user) {

                // user = new User({ auth0Id, role: null, appliedOffers: [], postedOffers: [] });
                // user.save()

                userService.create(auth0Id, email)
                    .then(userData => {
                        res.status(201).json({ message: 'User profile created successfully', user: userData });
                    })
                    .catch(err => {
                        console.log('Error while creating user: ', err);
                        throw (err);
                    });
            } else {
                res.status(400).json({ message: 'User already exists' });
            }
        })
        .catch(error => {
            console.log('Error on POST /create', error);
            res.status(500).json({ message: error });
        });
});

router.post('/set-role', async (req, res) => {
    // TODO: Add jwt creation in this action (jwt.sign)
    // TODO: add auth middleware

    const { auth0Id, role } = req.body;

    // User.updateOne({ auth0Id }, { $set: { role } })
    userService.update(auth0Id, { role })
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

router.get('/:auth0Id/companies', (req, res) => {
    const { auth0Id } = req.params;
    userService.getCompanies(auth0Id)
        .then(data => {
            res.json({ companies: data.companies });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Failed to get user companies',
                error
            });
        });
});

router.delete('/:auth0Id', (req, res) => {
    const { auth0Id } = req.params;

    userService.delete(auth0Id)
        .then(user => {
            res.json({ message: 'Account successfully deleted' });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Failed to delete account',
                error
            });
        });
});

module.exports = router;