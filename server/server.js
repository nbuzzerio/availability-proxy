const express = require('express');
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');

const app = express();

app.use(bodyParser.json());

app.use(express.static('./public'));

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
var testProxy = proxy(availabilityOptions);
app.use('/getAllMatchingBreed', testProxy);

//httpexpressmiddleware

const port = 3000;
app.listen(port, () => console.log(`The proxy-server is Running on port ${port}!`));