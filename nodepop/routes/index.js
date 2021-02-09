/* eslint-disable strict */
// eslint-disable-next-line lines-around-directive
'use strict';
const express = require('express');

const router = express.Router();
const Anuncio = require('../models/Anuncio');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const anuncios = await Anuncio.list();
    res.render('index', { anuncios });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
