/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { UnauthorizedError } = require('./errors');

module.exports = (req, res, next) => {
  // извлекаем токен
  const token = req.cookies.jwt;
  // верифицируем токен
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    if (err.name === 'JsonWebTokenError') { throw new UnauthorizedError('Необходимо авторизоваться'); }
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};
