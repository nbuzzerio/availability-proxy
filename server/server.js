const express = require('express');
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');

const app = express();

app.use(bodyParser.json());

app.use(express.static('./public'));

//availability proxy
var availabilityOptions = {
  target: 'http://localhost:3003',
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '/getAllMatchingBreed': 'http://localhost:3003/getAllMatchingBreed', // rewrite path
  },
  router: {
    'http://localhost:3000' : 'http://localhost:3003'
  }
}
var availabilityProxy = proxy(availabilityOptions);
app.use('/getAllMatchingBreed', availabilityProxy);


//info proxy
var infoOptions = {
  target: 'http://localhost:3002',
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '/api/oneBreed/': 'http://localhost:3002/api/oneBreed/', // rewrite path
  },
  router: {
    'http://localhost:3000' : 'http://localhost:3002'
  }
}
var infoProxy = proxy(infoOptions);
app.use('/api/oneBreed/', infoProxy);

//httpexpressmiddleware

const port = 3000;
app.listen(port, () => console.log(`The proxy-server is Running on port ${port}!`));