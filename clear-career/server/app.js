const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongooseConnector = require('./config/mongoose');
const { config } = require('./config');
const router = require('./router');
const nonMatching = require('./middlewares/nonMatching');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongooseConnector();

app.use('/api', router);

router.use(nonMatching);
router.use(errorHandler);

app.listen(config.PORT, () => {
    console.log(`Server is listening on port: ${config.PORT}...`);
});