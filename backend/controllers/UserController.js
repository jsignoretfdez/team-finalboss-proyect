const fs = require('fs');
const Users = require('../models/Users');

/* Function createUser */

exports.createUser = async (req, res, next) => {
  const { name, surname, email, username } = req.body;
  let avatar = req.file;

  /* Hasheo de password*/
  const passHash = await Users.hashPassword(req.body.password);

  /* Comprueba si viene archivo dentro de la key avatar
  si no viene fichero le asigna la img por defecto */
  if (!avatar) {
    avatar = Users.avatar;
  } else {
    avatar = req.file.filename;
  }
  try {
    /* Creo objetos datos usuario*/
    const userData = {
      name,
      username,
      password: passHash,
      email,
      surname,
      avatar,
    };

    /*Almaceno usuario en DB*/
    const user = new Users(userData);
    await user.save();
    res.json(user);
    next();
  } catch (err) {
    next(err);
  }
};

/* Function getUser */
exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  const userDetail = await Users.findById(id);

  /* Comprueba que exista algun usuario*/
  if (!userDetail) {
    res.send(404).json({ msg: 'El usuario no existe' });
    next();
  }

  res.json(userDetail);
};

/* Function updateUser */

exports.updateUser = async (req, res, next) => {
  const { password, ...filedUser } = req.body;

  try {
    /*Si cambiamos el password lo hashea*/
    if (password) {
      filedUser.password = await Users.hashPassword(password);
    }

    /*Busca usuario en la base de datos y si cambiamos algún parámetro lo
    actualiza y nos devuelve el nuevo objeto.
     */
    const user = await Users.findByIdAndUpdate(req.params.id, filedUser, {
      new: true,
    });

    /* Si cambiamos el avatar borra el antiguo avatar*/
    if (filedUser.avatar) {
      fs.unlinkSync(`./public/images/avatar/${filedUser.avatar}`);
    }

    /* Comprobamos que exista el usuario*/
    if (!user) {
      res.status(404).json({ msg: 'No existe el usuario.' });
      next();
    }

    res.json(user);
  } catch (err) {
    if (err.codeName) {
      res.status(401).json({ msg: 'Email o username duplicado' });
      next();
    }
  }
};

/* Function deleteUser */

exports.deleteUser = async (req, res, next) => {
  const userDelete = await Users.findById(req.params.id);
  try {
    /* Comprobamos que exista el usuario */
    if (!userDelete) {
      res
        .status(404)
        .json({ msg: 'No existe el usuario en la base de datos.' });
      next();
    }

    /* Comprobamos si el usuario recibido es el mismo que el que se almacena en el token*/
    if (userDelete._id == req.userId) {
      await Users.findByIdAndRemove(userDelete);

      /* Borra el usuario y la foto del avatar*/
      res.json({ msg: 'Usuario Borrado Correctamente', del: userDelete });
      fs.unlinkSync(`./public/images/avatar/${userDelete.avatar}`);
      return;
    }
    res.status(401).json({
      msg: 'No tienes permisos para hacer esto',
    });
    next();
  } catch (err) {
    res.status(404).json({ msg: 'No se puede borrar el usuario' });
    next();
  }
};
