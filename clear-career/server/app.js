const express = require('express');
const cors = require('cors');
const mongooseConnector = require('./config/mongoose');
const config = require('./config');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors());

mongooseConnector();

app.use('/api/users', userRoutes);

app.get('/status', (req, res) => {
    res.send({
        'Status': 'Running'
    })
});

app.listen(config.PORT, () => {
    console.log(`Server is listening on port: ${config.PORT}...`);
});