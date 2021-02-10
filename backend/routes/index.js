const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

module.exports = function () {

  /*Post create user*/

  router.post('/registro', UserController.createUser);

  return router;

}
