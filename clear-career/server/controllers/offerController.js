const offerService = require('../services/offerService');

const router = require('express').Router();

router.post('/create', (req, res) => {
    offerService.create(req.body)
        .then(response => {
            res.json({ offerCompanyId: response._doc.company._doc._id, message: 'Offer successfully created' });
        })
        .catch(err => {
            console.log(err);

        });
});

module.exports = router;