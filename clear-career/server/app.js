import express from 'express';
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/status', (req, res) => {
    res.send({
        'Status': 'Running'
    })
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}...`);
});