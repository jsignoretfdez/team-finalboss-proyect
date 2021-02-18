const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username });

  if (!user) {
    await res.status(401).json({ msg: 'No existe el usuario.' });
    next();
  } else if (!bcrypt.compareSync(password, user.password)) {
    await res.status(401).json({ msg: 'La Contraseña no es correcta.' });
    next();
  } else {
    const token = jwt.sign(
      {
        email: user.email,
        username: user.username,
        id: user._id,
      },
      process.env.KEY_SECRET,
      { expiresIn: '2d' }
    );

    res.json({ token });
  }
};
