//const mongoose = require('mongoose');
const Users = require('../models/Users');


exports.createUser = async (req, res, next) => {
    const{name, surname, email, username,avatar} = req.body;
    const passHash = await Users.hashPassword(req.body.password)

    try {
        const userData = {
            name,
            username,
            password: passHash,
            email,
            surname,
            avatar
        }

        const user = new Users(userData);
        await user.save()
        console.log(user);
        res.json(user);

    } catch (err){
        next(err);
    }
}

exports.user = async (req, res, next) => {

    const userDetail = await Users.findById(req.params.id);

    if(!userDetail){
        res.send(404).json({msg: "El usuario no existe"});
        next();
    };

    res.json(userDetail);

}
