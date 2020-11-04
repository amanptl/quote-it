const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const bodyParser = require('body-parser');
const automl = require('@google-cloud/automl');

// Create client for prediction service.
const client = new automl.PredictionServiceClient();

const app = express();
/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const projectId = "quote-it-294619";
const computeRegion = `region-name, e.g. "us-central1"`;
const modelId = `id of the model, e.g. “ICN723541179344731436”`;
const filePath = `local text file path of content to be classified, e.g. "./resources/flower.png"`;
const scoreThreshold = `value between 0.0 and 1.0, e.g. "0.5"`;

// Get the full path of the model.
const modelFullId = client.modelPath(projectId, computeRegion, modelId);



app.get('/', (req, res) => {
    res.send("Sever is running")
});

app.post('/predict', async(req, res) => {
    const params = {};
    let results = {'labels': []}

    // Read the file content for prediction.
    const content = fs.readFileSync(req.files[0].path, 'base64');

    if (scoreThreshold) {
        params.score_threshold = scoreThreshold;
    }

    // Set the payload by giving the content and type of the file.
    const payload = {};
    payload.image = {imageBytes: content};

    // params is additional domain-specific parameters.
    // currently there is no additional parameters supported.
    const [response] = await client.predict({
        name: modelFullId,
        payload: payload,
        params: params,
    });
    console.log('Prediction results:');
    response.payload.forEach(result => {
        results['labels'].push(${result.displayName})
        // console.log(`Predicted class name: ${result.displayName}`);
        // console.log(`Predicted class score: ${result.classification.score}`);
    });
    res.send(results);
});

app.get('*', (req, res) => {
  res.status(404).send('Not Found')
});

app.listen(5000, async () => {
    console.log('Loading imagenet model');
     model = await mobilenet.load({
         version: 2,
         alpha: 1.0,
     });
    console.log('Imagenet model loaded');
    console.log('Label server is up and running!')
})
