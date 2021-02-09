/* eslint-disable lines-around-directive */
// eslint-disable-next-line strict
'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true, index: true },
  password: { type: String },
},
{
  autoIndex: process.env.NODE_ENV !== 'production',
});

usuarioSchema.statics.hashPassword = function (plainTextPass) {
  return bcrypt.hash(plainTextPass, 10);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
