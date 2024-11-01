const express = require('express');
const router = express.Router();

router.post('/set-role', (req, res) => {
    const { auth0Id, role } = req.body;

    let user = await 
});

module.exports = router;