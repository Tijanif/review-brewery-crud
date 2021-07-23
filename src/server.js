const express = require('express');
const morgan = require('morgan');

const app = express();

// middleware

app.use(morgan('dev'));

// Routes

// running server
app.listen(4000, () => {
  console.log('I am running');
});
