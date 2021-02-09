/* eslint-disable lines-around-directive */
// eslint-disable-next-line strict
'use strict';

class ChangeLocale {
  async changeLanguage(req, res, next) {
    try {
      const { locale } = req.params;

      const back = req.get('referer');

      res.cookie('language', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 });

      res.redirect(back);
      console.log('Hola');
      return;
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ChangeLocale();
