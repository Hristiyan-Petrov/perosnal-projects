const companyService = require('../services/companyService');

const express = require('express')
const router = express.Router();

router.post('/create', (req, res) => {
    companyService.create(req.body)
        .then(response => {
            res.json({ company: response._doc, message: 'Company successfully created' });
        })
        .catch(err => {
            console.log(err);

        });
});

router.get('/:companyId/offers', (req, res) => {
    const companyId = req.params.companyId
    companyService.getOffers(companyId)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: `Failed to get offers for company ${offerId}` });
        });
});


module.exports = router;