import express from 'express';
import cors from 'cors';
import mongooseConnector from './config/mongoose.js';
import config from './config/index.js';

const app = express();

app.use(express.json());
app.use(cors());

mongooseConnector();

app.get('/status', (req, res) => {
    res.send({
        'Status': 'Running'
    })
});

app.listen(config.PORT, () => {
    console.log(`Server is listening on port: ${config.PORT}...`);
});