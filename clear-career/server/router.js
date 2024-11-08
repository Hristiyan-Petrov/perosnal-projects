const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController');

const nonMatching = require('./middlewares/nonMatching');
const errorHandler = require('./middlewares/errorHandler');

router.use('/users', userController);

router.get('/status', (req, res) => {
    res.send({
        'Status': 'Running'
    })
});

module.exports = router;