/* eslint-disable */
'use strict';

const usuarios = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthenticateController {

    async post (req, res, next){
        try{
            const email = req.body.email;
            const password = req.body.password;

            const usuario = await usuarios.findOne({email: email});

            if (!usuario || !await bcrypt.compare(password, usuario.password)){
                const error = new Error ('Invalid Credentials');
                error.status = 401;
                next(error);
                return;
            }

            jwt.sign({id: usuario._id}, process.env.PRIVATEJWT_SECRET,{expiresIn: '2d'}, (err, token) => {
                if (err) return next(err);

                res.json({token});
            })


        }catch (err) {
            console.log(err);
        }
    }

}

module.exports = new AuthenticateController();
