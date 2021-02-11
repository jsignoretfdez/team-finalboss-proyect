const Adverts = require('../models/Adverts');
const authController = require('./authenticateController');

exports.createrAdvert = async function (req, res, next) {
  console.log('The logged in user has the _id:', req.apiAuthUserID);

  try {
    const { name } = req.query;
    const { image } = req.query;
    const { description } = req.query;
    const { price } = req.query;
    const { type } = req.query;
    const { tags } = req.query;
    // Others
    const limit = parseInt(req.query.limit || 10);
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort || '_id'

    // Search filters
    const filter {};

    if (typeof name !== 'undefined') {
        filter.name =new RegExp('^' + name, 'i');
    }

    // typeof image
    // typeof description

    if (typeof price !== 'undefined' && price !== '-') {
        if (price.indexOf('-') !== -1) {
          filter.price = {};
          let range = price.split('-');
          if (range[0] !== '') {
            filter.price.$gte = range[0];
          }
          if (range[1] !== '') {
            filter.price.$lte = range[1];
          }
        } else {
          filter.price = price;
        }
      }

      if (typeof tags !== 'undefined') {
        filter.tags = tags;
      }

      if (typeof type !== 'undefined') {
        filter.type = type;
      }
  } catch (err) {
    next(err);
  }
};
