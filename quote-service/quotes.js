const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send("Server is running")
});

app.get('*', (req, res) => {
  res.status(404).send('Not Found')
});

app.listen(3000, () => {
    console.log('Quotes server is up and running.')
});