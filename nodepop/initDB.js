/* eslint-disable strict */
// eslint-disable-next-line lines-around-directive
'use strict';

require('dotenv').config();

const readline = require('readline');
const fs = require('fs');
const conn = require('./lib/connectionDB');
const Anuncio = require('./models/Anuncio');
const Usuario = require('./models/Usuario');
const cote = require('cote');

function questionUser(question) {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function createAnuncio() {
  try {
    // Borrar base de datos
    console.log('Borrando Base de datos...');
    await Anuncio.deleteMany();

    const anunciosData = fs.readFileSync('./anuncios.json');
    const anuncios = JSON.parse(anunciosData);
    const anunciosResult = await Anuncio.insertMany(anuncios);
    console.log(`La Base de datos se ha creado correctamente y se ha añadido ${anunciosResult.length} colecciones`);
  } catch (e) {
    console.log('Aqui', e);
  }
}

async function createUsuario() {
  try {
    // Borrar base de datos
    console.log('Borrando Base de datos...');
    await Usuario.deleteMany();
    const usuariosCreados = await Usuario.insertMany({
      email: 'admin@example.com',
      password: await Usuario.hashPassword('1234'),
    });
    console.log(`La Base de datos se ha creado correctamente y se ha añadido ${usuariosCreados.length} colecciones`);
  } catch (e) {
    console.log('Aqui', e);
  }
}

conn.once('open', async () => {
  try {
    const answerUser = await questionUser('Quieres reinicializar la Base de Datos? (no) ');
    if (answerUser.toLowerCase() === 'si') {
      console.log('Borrando la Base de datos');
      await createAnuncio();
      await createUsuario();
      conn.close();
    } else {
      console.log('No se borrara');
      process.exit(1);
    }
  } catch (e) {
    console.log(e);
  }
});
