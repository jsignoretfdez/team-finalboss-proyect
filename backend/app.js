const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');

// Loading environmet variables
require('dotenv').config();

const app = express();

// Mongoose Connection
require('./lib/connectionDB');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/', indexRouter());

/**
 * API Routes
 */
app.use('/', require('./routes/api/adverts.routes'));

module.exports = app;
