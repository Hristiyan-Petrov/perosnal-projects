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
    companyService.getOffers(req.params.companyId)
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.log(err);

        });
});


module.exports = router;