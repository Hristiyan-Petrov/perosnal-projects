const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController');
const companyController = require('./controllers/companyController');

router.use('/users', userController);
router.use('/companies', companyController);

router.get('/status', (req, res) => {
    res.send({
        'Status': 'Running'
    })
});

module.exports = router;