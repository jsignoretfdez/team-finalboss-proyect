/* eslint-disable strict */
// eslint-disable-next-line lines-around-directive
'use strict';
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
const mongoose = require('./lib/connectionDB');
const indexRouter = require('./routes/index');
const apiAnuncios = require('./routes/api/anuncios');
const authenticateController = require('./controllers/authenticateController');
const authJWT = require('./lib/authJWT');
const anunciosController = require('./controllers/anunciosController');
const changeLocale = require('./controllers/change-locale');
const i18n = require('./lib/i18nconfigure');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(i18n.init);

app.locals.title = 'Nodepop';

app.use('/', indexRouter);
app.get('/change-locale/:locale', changeLocale.changeLanguage);
app.get('/anuncios-lista', anunciosController.anuncioLista);
app.post('/api/authenticate', authenticateController.post);
app.use('/api/anuncios', authJWT(), apiAnuncios);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
