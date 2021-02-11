const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username });

  if (!user) {
    await res.status(401).json({ msg: 'El usuario no existe' });
    next();
  } else if (!bcrypt.compareSync(password, user.password)) {
    await res.status(401).json({ msg: 'El password no es correcto' });
    next();
  } else {
    const token = jwt.sign(
      {
        email: user.email,
        username: user.username,
        // eslint-disable-next-line no-underscore-dangle
        id: user._id,
      },
      process.env.KEY_SECRET,
      { expiresIn: '2d' }
    );

    res.json({ token });
  }
};
