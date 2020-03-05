const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(express.static('./public'));

const port = 3000;
app.listen(port, () => console.log(`The proxy-server is Running on port ${port}!`));