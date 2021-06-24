/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-bitwise */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  NotFoundError, BadRequestError, DuplicateEmailError, UnauthorizedError,
} = require('../middlewares/errors');

function getUrers(req, res, next) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
}

function getUserById(req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      res.send(user);
    })
    .orFail(() => new Error('NotFound'))
    .catch((err) => {
      if (err.message === 'NotFound') {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
    })
    .catch(next);
}

function getUser(req, res, next) {
  User.findById(req.user._id)
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
    })
    .catch(next);
}

function createUser(req, res, next) {
  const {
    // eslint-disable-next-line no-unused-vars
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send(
      {
        name: user.name, about: user.about, avatar: user.avatar, _id: user._id, email: user.email,
      },
    ))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные при создании пользователя');
      } else if
      (err.name === 'MongoError') {
        throw new DuplicateEmailError('Пользователь с таким email уже зарегистрирован');
      }
    })
    .catch(next);
}

function updateProfile(req, res, next) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при обновлении профиля пользователя');
      }
    })
    .catch(next);
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((avatar) => res.send(avatar))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при обновлении аватара пользователя');
      }
    })
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль, невозможно авторизоватся'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль, невозможно авторизоватся'));
          }
          // аутентификация успешна
          // создаем токен
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          // возвращаем токен в куки, срок жизни 7 дней
          res
            .cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
            })
            .send({ message: 'Успешный логин' })
            .end();
        });
    })
    .catch(next);
}

module.exports = {
  getUrers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUser,
};
