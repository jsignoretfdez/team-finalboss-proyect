const express = require('express');

const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/authenticateController');
const auth = require('../middleware/auth');
const { upload } = require('../middleware/multer');
const { validateUser } = require('../middleware/validateUser');

module.exports = function () {
  /* Routes CRUD User */

  router.post(
    '/api/registro',
    upload('avatar').single('avatar'),
    validateUser,
    UserController.createUser
  );
  router.get('/api/user/:id', auth, UserController.getUser);
  router.put(
    '/api/updateUser/:id',
    auth,
    validateUser,
    UserController.updateUser
  );
  router.delete('/api/deleteUser/:id', auth, UserController.deleteUser);
  router.post('/api/login', AuthController.login);
  router.post('/forgot-password', AuthController.forgotPassword);

  return router;
};
