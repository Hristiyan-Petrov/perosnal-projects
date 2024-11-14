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

module.exports = router;