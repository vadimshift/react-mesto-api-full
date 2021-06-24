const router = require('express').Router();
const {
  createCard, getCards, delCard, setLikeCard, setDislikeCard,
} = require('../controllers/cards');
const { validateCardBody, validateCardId } = require('../middlewares/validators');

router.get('/cards', getCards);
router.post('/cards', validateCardBody, createCard);
router.delete('/cards/:cardId', validateCardId, delCard);
router.put('/cards/:cardId/likes', validateCardId, setLikeCard);
router.delete('/cards/:cardId/likes/', validateCardId, setDislikeCard);

module.exports = router;
