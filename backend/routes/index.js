'use strict';

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/authenticateController');

module.exports = function () {

  /*Post create user*/

  router.post('/api/registro', UserController.createUser);
  router.post('/api/login', AuthController.login);

  return router;

}
