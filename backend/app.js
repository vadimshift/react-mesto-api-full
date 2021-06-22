/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateUserBody, validateAuthentication } = require('./middlewares/validators');
const {
  createUser,
  login,
} = require('./controllers/users');
const { NotFoundError } = require('./middlewares/errors');
const processingErrors = require('./middlewares/processingErrors');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const whitelist = ['http://localhost:3001', 'http://localhost:3000', '*', 'http://217.28.231.174:3000'];
const corsOptions = {
  origin: whitelist,
  credentials: true,
};

// подключаем мидлвары, роуты и всё остальное...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);
app.use(helmet());
app.use(requestLogger);
//app.use(cors(corsOptions));

app.post('/signin', validateAuthentication, login);
app.post('/signup', validateUserBody, createUser);

app.use(auth);

app.use(userRoutes);
app.use(cardRoutes);

app.use('/', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger); // пишем ошибки  в файл

app.use(errors()); // ошибки celebrate

app.use(processingErrors); // обработка ошибок

app.listen(PORT);
