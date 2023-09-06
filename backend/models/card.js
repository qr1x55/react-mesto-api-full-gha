const mongoose = require('mongoose');
const regexUrl = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Должно быть заполнено'],
    minlength: [2, 'Минимальная длина - 2'],
    maxlength: [30, 'Максимальная длина - 30'],
  },
  link: {
    type: String,
    required: [true, 'Должно быть заполнено'],
    validate: {
      validator(url) {
        return regexUrl.test(url);
      },
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
