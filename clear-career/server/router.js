const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController');
const companyController = require('./controllers/companyController');
const offerController = require('./controllers/offerController');

router.use('/users', userController);
router.use('/companies', companyController);
router.use('/offers', offerController);

module.exports = router;