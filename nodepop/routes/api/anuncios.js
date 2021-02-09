/* eslint-disable strict */
// eslint-disable-next-line lines-around-directive
'use strict';

const express = require('express');
const multer = require('multer');

const router = express.Router();
const cote = require('cote');
const Anuncio = require('../../models/Anuncio');
const path = require('path');

// Funcionalidad subir imagenes a la base de datos
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/images/anuncios');
  },
  filename(req, file, cb) {
    const myFilename = `${Date.now()}_${file.originalname}`;
    cb(null, myFilename);
  },
});

const upload = multer({ storage });

/* Post Renderiza Vista para Crear anuncio */
router.get('/crear-anuncio', (req, res, next) => {
  res.render('crear');
});

/* POST to upload new anuncio */
router.post('/upload', upload.single('foto'), async (req, res, next) => {
  try {
    const {
      nombre, precio, tags, venta,
    } = req.body;
    const foto = req.file.filename;
    const thumbnail = path.join(`./images/thumbnails/Thumb_${foto}`);

    // Creamos el documento en memoria
    const anuncio = new Anuncio({
      nombre, precio, venta, tags, foto, thumbnail,
    });

    // Lo guardamos en BD
    const anuncioGuardado = await anuncio.save();
    res.json(anuncioGuardado);

    const requesterThumbnail = new cote.Requester({ name: 'newThumb' });

    requesterThumbnail.send({
      type: 'createThumb',
      rutaImg: `/images/anuncios/${foto}`,
      thumb: `Thumb_${foto}`,
    });
  } catch (err) {
    next(err);
  }
});

// Listado de anuncios y filtros
router.get('/', async (req, res, next) => {
  try {
    const {
      nombre, sort, tags, precio, venta,
    } = req.query;
    const limit = parseInt(req.query.limit || 10);
    const skip = parseInt(req.query.skip);
    const filtro = {};
    // Filtro por nombre
    if (nombre !== undefined) {
      filtro.nombre = new RegExp(`^${
        nombre}`, 'i');
    }
    // Filtro Rango de precios
    if (precio !== undefined) {
      const precioSave = precio.split('-').map(parseFloat);
      if (precioSave.length >= 1) {
        filtro.precio = precio;
        if (precioSave[0] && !precioSave[1]) {
          filtro.precio = { $gte: precioSave[0] };
        } if (!precioSave[0] && precioSave[1]) {
          filtro.precio = { $lte: precioSave[1] };
        } if (precioSave[0] && precioSave[1]) {
          filtro.precio = { $gte: precioSave[0], $lte: precioSave[1] };
        }
      }
    }
    // Filtro Tags
    if (typeof tags !== 'undefined') {
      // Convert tags string into array
      filtro.tags = { $in: tags.split(' ') };
    }
    // Filtro Venta
    if (venta !== undefined) {
      filtro.venta = venta;
    }
    // Listado de anuncios
    const anuncios = await Anuncio.list(filtro, limit, skip, sort, tags);
    res.json(anuncios);
  } catch (err) {
    next(err);
  }
});

// Middleware para eliminar anuncio
router.delete('/:_id', async (req, res, next) => {
  try {
    const { _id } = req.params;

    await Anuncio.deleteOne({
      _id,
    });

    res.json({
      status: 'Ok',
      resultado: 'Anuncio Borrado Correctamente',
      id: _id,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/tags', async (req, res, next) => {
  const tagsList = ['work', 'funny', 'sport', 'house', 'lifestyle', 'gaming'];
  const list = tagsList.join(' / ');
  res.json({
    tagsPermitidos: list,
  });
});

module.exports = router;
