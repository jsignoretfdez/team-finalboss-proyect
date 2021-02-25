const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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

/* Función Reset Password */

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });

  try {
    if (!user) {
      res.status(404).json({ msg: 'El usuario no existe en la BD' });
      next();
    }

    const token = crypto.randomBytes(20).toString('hex');

    const update = { resetPasswordToken: token };

    await Users.findByIdAndUpdate(user, update, {
      new: true,
    });

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'jsignoretfernandez',
        pass: 'Leiariadne1419',
      },
    });

    const mailOptions = {
      from: '<jsignoretfernandez@gmail.com>',
      to: 'jsignoretfernandez@gmail.com',
      subject: 'Reset Password',
      html: `<p>Hola ${user.name},</p> 
    <p>Ha solicitado el cambio de contraseña</p>
    <p>Pulse el siguiente link: http://localhost:5000/reset-password/${token}</p>
    <p>Saludos.</p>
`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        res.send(500, err.message);
      } else {
        res.status(200).json(req.body);
      }
    });

    console.log(mailOptions);
  } catch (err) {
    next(err);
  }
};
