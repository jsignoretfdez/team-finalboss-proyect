/* eslint-disable strict */
// eslint-disable-next-line lines-around-directive
'use strict';

const Anuncio = require('../models/Anuncio');

class anunciosController {
  async anuncioLista(req, res, next) {
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
      // res.json(anuncios);
      res.render('anuncios', { anuncios });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new anunciosController();
