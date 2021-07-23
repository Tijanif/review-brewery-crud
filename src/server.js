const express = require('express');
const morgan = require('morgan');
const breweriesRouter = require('./resources/breweries/routes');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json()); // give ths app ability to understand JSON

// Routes
app.use('/breweries', breweriesRouter);

// running server
app.listen(4000, () => {
  console.log('I am running');
});
