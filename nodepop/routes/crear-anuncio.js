/* eslint-disable strict,lines-around-directive */
'use strict';

const express = require('express');

const router = express.Router();

/* GET home page. */
router.post('/', (req, res, next) => {
  res.render('crear');
});

module.exports = router;
