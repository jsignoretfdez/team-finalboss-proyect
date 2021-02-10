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
        res.json(user);

    } catch (err){
        next(err);
    }
}
