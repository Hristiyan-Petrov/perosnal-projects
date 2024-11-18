const offerService = require('../services/offerService');

const router = require('express').Router();

router.post('/create', (req, res) => {
    offerService.create(req.body)
        .then(response => {
            res.status(201).json({ offerCompanyId: response._doc.company._doc._id, message: 'Offer successfully created' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to create offer' });
        });
});

router.get('/', (req, res) => {
    offerService.getAll()
        .then(response => {
            res.json({ offers: response });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to getAll offers' });
        });
});

router.get('/:offerId', (req, res) => {
    const offerId = req.params.offerId;
    offerService.getOne(offerId)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: `Failed to get offer ${offerId}` });
        });
})

module.exports = router;