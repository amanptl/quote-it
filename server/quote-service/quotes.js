const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send("Server is running")
});

app.get('/quotes', (req, res) => {
  const tag = req.param.tag
  const options = {
      url: 'https://api.paperquotes.com/apiv1/quotes/?tags=hair,potrait&curated=1',
      headers: {
        'Authorization': process.env.QUOTES_API
      },
      params: {
        'tags': tag
      }
    };
    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.send(body)
      };
      res.send(response.statusCode)
    });
});

function getQuotes(tag) {
  const options = {
    url: 'https://api.paperquotes.com/apiv1/quotes/?tags=hair,potrait&curated=1',
    headers: {
      'Authorization': 'Token 46512a1ab44bdcaf07dbc9ff7707634d086cdf7e'
    },
    params: {
      'tags': tag
    }
  };
  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      
    };
  });
};

app.get('*', (req, res) => {
  res.status(404).send('Not Found')
});

app.listen(3000, () => {
    console.log('Quotes server is up and running.')
});