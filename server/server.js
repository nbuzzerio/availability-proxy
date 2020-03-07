const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(express.static('./public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../public/index.html'));
});

const port = 3000;
app.listen(port, () => console.log(`The proxy-server is Running on port ${port}!`));