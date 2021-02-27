const express = require('express');
// const multer = require('multer');
const router = express.Router();
const advertController = require('../../controllers/advertController');
const Adverts = require('../../models/Adverts');

/**
 *  Get /api/adverts
 */
router.get('/adverts', advertController.getAdvert);

/**
 * GET /api/adverts/<_id>
 */
router.get('/_id', async (req, res, next) => {
  try {
    const { _id } = req.params;

    const advert = await Adverts.findOne({ _id });

    res.json({ result: advert });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
