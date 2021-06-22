/* eslint-disable no-shadow */
/* eslint-disable quotes */
/* eslint-disable no-multi-assign */
/* eslint-disable no-bitwise */
const Card = require('../models/card');
const { NotFoundError, BadRequestError, RuleError } = require('../middlewares/errors');

function createCard(req, res, next) {
  const {
    name, link, likes, createdAt,
  } = req.body;
  Card.create({
    name, link, owner: req.user._id, likes, createdAt,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при создании карточки');
      }
    })
    .catch(next);
}

function getCards(req, res, next) {
  Card.find({})
    .then((data) => res.send(data))
    .catch(next);
}

function delCard(req, res, next) {
  const currentUser = req.user._id; // id текущего пользователя
  const { cardId } = req.params; // id карточки из запроса
  Card.findById(cardId)
    .then((card) => {
      const cardOwner = card.owner.toString();
      if (currentUser === cardOwner) {
        Card.findByIdAndRemove(cardId)
          .then((card) => res.send({ data: card }));
      } else {
        next(new RuleError('Нет прав на удаление данной карточки'));
      }
    })
    .catch(() => next(new NotFoundError('Карточка с указанным _id не найдена')))
    .catch(next);
}

function setLikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавление _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
    })
    .catch(next);
}

function setDislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
    })
    .catch(next);
}

module.exports = {
  createCard,
  getCards,
  delCard,
  setLikeCard,
  setDislikeCard,
};
