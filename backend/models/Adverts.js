'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    description: {
      type: String,
      maxlength: 150,
    },

    price: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ['sell', 'buy'],
      required: true,
    },

    tags: {
      type: String,
      enum: [
        'Tech',
        'Sports',
        'Games',
        'Gaming',
        'Mobile',
        'Toys',
        'Home',
        'Forniture',
        'Photography',
      ],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  },
  { timestamps: true },
);

const Adverts = mongoose.model('Adverts', advertsSchema);

module.exports = Adverts;
