'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const usuarioSchema = new Schema({

    name:{
        type: String,
        required: true,
    },

    surname:{
        type: String,
    },

    username:{
      type:String,
      unique:true,
      required: true,
      trim: true,
      lowercase: true,
    },

    email:{
        type:String,
        unique:true,
        required: true,
        trim: true,
        lowercase: true
    },

    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },

    avatar:{
        type: String,
        default: ""
    },

    favorites:[{type: Schema.ObjectId, ref: "Adverts"}]},

    {
        timestamps: true
    }

);

usuarioSchema.statics.hashPassword = function (plainTextPass) {
    return bcrypt.hash(plainTextPass, 12);
};


const Users = mongoose.model('Users', usuarioSchema);

module.exports = Users;
