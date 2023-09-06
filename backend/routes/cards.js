const router = require('express').Router();
const {
  addCard, getCards, deleteCard, likeCard, removeLikeCard,
} = require('../controllers/cards');
const { addCardValid, cardIdValid } = require('../middlewares/routesValidators');

router.get('/', getCards);

router.post('/', addCardValid, addCard);

router.delete('/:cardId', cardIdValid, deleteCard);

router.put('/:cardId/likes', cardIdValid, likeCard);

router.delete('/:cardId/likes', cardIdValid, removeLikeCard);

module.exports = router;
