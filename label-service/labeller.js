const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
//const toUint8Array = require('base64-to-unit8array');

let model;
const app = express();

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer({dest: '/tmp'}).any());

app.get('/', (req, res) => {
    res.send("Sever is running")
});

app.get('*', (req, res) => {
  res.status(404).send('Not Found')
});

app.listen(5000, async () => {
    console.log('Loading imagenet model');
     model = await mobilenet.load({
         version: 1,
         alpha: 0.25 | .50 | .75 | 1.0,
     });
    console.log('Imagenet model loaded');
    console.log('Server up and running!')
})
