const express = require('express');
const multer = require('multer');
const router = express.Router();
const advertController = require('../../controllers/advertController');

/**
 *  Get /api/adverts
*/

router.get('/adverts', advertController.createrAdvert);
