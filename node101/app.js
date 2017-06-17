const express = require('express'); // imports express library
const path = require('path'); // imports path module
const bodyParser = require('body-parser'); // imports body parser

// initialize express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const candiesController = require('./controller/candies')(app);


app.listen(3000, () => {
  console.log('Node.js listening on port 3000');
});
