/* eslint-disable strict,lines-around-directive,consistent-return */
'use strict';

const jwt = require('jsonwebtoken');

module.exports = function () {
  return (req, res, next) => {
    const jwtToken = req.get('Authorize') || req.query.token || req.body.token;
    if (!jwtToken) {
      return res.status(401).json({
        mensaje: 'Token does not exist',
        status: 401,
      });
    }
    jwt.verify(jwtToken, process.env.PRIVATEJWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({
          mensaje: 'Modified Token',
          status: 401,
        });
      }
      req.sessionIdApi = payload.id;
      return next();
    });
  };
};
